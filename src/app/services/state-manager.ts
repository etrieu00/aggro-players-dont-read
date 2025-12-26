import {computed, effect, Injectable, signal} from '@angular/core';
import {Subject, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

export interface PuzzleState {
  reveal: boolean;
  focus?: ['one' | 'two', keyof Player];
  hover?: string;
  game: Game
  one: Player;
  two: Player;
  display: string[];
}

export interface Game {
  turn: number;
  phase: 'main';
  champion: {
    one: string;
    two: string;
  };
  health: {
    one: number;
    two: number;
  }
}

export interface Player {
  hand: string[];
  deck: string[];
  material: string[];
  graveyard: string[];
  banish: string[];
  field: string[];
  champion: string[];
  memory: string[];
}

@Injectable({
  providedIn: 'root',
})
export class StateManager {
  #State = signal<PuzzleState>({
    reveal: false,
    game: {
      turn: 0,
      phase: 'main',
      health: {
        one: 15,
        two: 15
      },
      champion: {
        one: 'spirit-of-water-sp2',
        two: 'spirit-of-fire-sp2'
      }
    },
    one: {
      hand: [
        'firebloom-flourish-hvn',
        'glowering-conflagration',
        'searing-rebuke',
        'fractal-of-sparks'
      ],
      deck: [],
      material: [],
      graveyard: [],
      banish: [],
      field: [],
      champion: [],
      memory: [
        'fractal-of-sparks'
      ],
    },
    two: {
      hand: [
        'firebloom-flourish-hvn',
        'firebloom-flourish-hvn',
        'firebloom-flourish-hvn',
        'firebloom-flourish-hvn',
        'firebloom-flourish-hvn',
        'firebloom-flourish-hvn',
        'firebloom-flourish-hvn'
      ],
      deck: [],
      material: [],
      graveyard: [],
      banish: [],
      field: [],
      champion: [],
      memory: [],
    },
    display: [],
  });

  hover$ = new Subject<string>();
  focus$ = new Subject<['one' | 'two', keyof Player]>();
  #display$ = new Subject<['one' | 'two', keyof Player]>();
  move$ = new Subject<string[]>();
  health$ = new Subject<['one' | 'two', number]>();

  $focus = computed(() => this.#State().focus);
  $hover = computed(() => this.#State().hover);
  $display = computed(() => this.#State().display);
  $champion = computed(() => this.#State().game.champion);
  $phase = computed(() => this.#State().game.phase);
  $turn = computed(() => this.#State().game.turn);
  $one = computed(() => this.#State().one);
  $two = computed(() => this.#State().two);
  $reveal = computed(() => this.#State().reveal);

  constructor() {
    this.move$.pipe(takeUntilDestroyed())
      .subscribe(delta => this.#State.update(state => ({...state, one: {...state.one, hand: delta}})))
    this.focus$.pipe(takeUntilDestroyed(), tap(selection => this.#display$.next(selection)))
      .subscribe(selection => this.#State.update(state => ({...state, focus: selection})));
    this.#display$.pipe(takeUntilDestroyed())
      .subscribe(([player, selection]) => this.#State.update(state => ({...state, display: state[player][selection]})))
    this.hover$.pipe(takeUntilDestroyed())
      .subscribe(selection => this.#State.update(state => ({...state, hover: selection})));
    this.health$.pipe(takeUntilDestroyed())
      .subscribe(([player, current]) => this.#State.update(state => ({
        ...state,
        game: {
          ...state.game,
          health: {
            ...state.game.health,
            [player]: current
          }
        }
      })))
    effect(() => {
      console.log(this.#State());
    });
  }


}
