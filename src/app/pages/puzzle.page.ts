import {Component, inject} from '@angular/core';
import {StateManager} from '../services/state-manager';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'page-puzzle',
  imports: [
    TitleCasePipe
  ],
  template: `
    <div class="h-full w-full grid grid-cols-12 grid-rows-11 gap-4">
      <div class="h-full w-full grid grid-rows-9 col-span-2 row-span-9 gap-4 p-4">
        <div class="w-full h-full row-span-5">
          @if ($hover(); as card) {
            <img class="object-contain rounded-2xl" alt="Grand Archive Card" src="cards/{{card}}.jpg"/>
          }
        </div>
        <div class="rw-full h-full row-span-4 border-2 border-dashed border-white rounded-2xl">
          <p class="text-white p-4">The wall of text goes here!</p>
        </div>
      </div>
      <div class="grid grid-cols-10 grid-rows-12 row-span-9 col-span-6 gap-2 p-4 bg-slate-600 rounded-2xl">
        @let one = $one();
        @let two = $two();
        <div class="order-4 relative w-full col-span-1 row-span-2"
             (click)="$reveal() && focus$.next(['two', 'material'])">
          <img class="object-contain rounded-md" alt="Grand Archive Card" src="{{blank}}"/>
          <p class="absolute top-2 left-2 text-md text-white">Material</p>
          <p class="absolute bottom-2 right-2 text-2xl text-white font-bold">x {{ two.material.length }}</p>
        </div>
        <div class="order-1 relative w-full h-full col-span-1 row-span-2"
             (click)="$reveal() && focus$.next(['two', 'deck'])">
          <img class="object-contain rounded-md" alt="Grand Archive Card" src="{{blank}}"/>
          <p class="absolute top-2 left-2 text-md text-white">Deck</p>
          <p class="absolute bottom-2 right-2 text-2xl text-white font-bold">x {{ two.deck.length }}</p>
        </div>
        <div class="order-5 relative w-full h-full col-span-1 row-span-2"
             (click)="focus$.next(['two', 'graveyard'])">
          @if (two.graveyard.length === 0) {
            <img class="object-contain rounded-md" alt="Grand Archive Card" src="{{blank}}"/>
          } @else {
            <img class="object-contain rounded-md" alt="Grand Archive Card" src="cards/{{two.graveyard[0]}}"/>
          }
          <p class="absolute top-2 left-2 text-md text-white">Graveyard</p>
          <p class="absolute bottom-2 right-2 text-2xl text-white font-bold">x {{ two.graveyard.length }}</p>
        </div>
        <div class="order-8 relative w-full h-full col-span-1 row-span-2"
             (click)="focus$.next(['two', 'banish'])">
          @if (two.banish.length === 0) {
            <img class="object-contain rounded-md" alt="Grand Archive Card" src="{{blank}}"/>
          } @else {
            <img class="object-contain rounded-md" alt="Grand Archive Card" src="cards/{{two.banish[0]}}"/>
          }
          <p class="absolute top-2 left-2 text-md text-white">Banished</p>
          <p class="absolute bottom-2 right-2 text-2xl text-white font-bold">x {{ two.banish.length }}</p>
        </div>
        <div class="order-2 relative w-full h-full col-span-7 row-span-2 border-2 border-dashed border-white rounded-2xl bg-slate-500"
             (click)="$reveal() && focus$.next(['two', 'hand'])">
          <ol class="flex flex-row gap-4 w-full h-full p-2 overflow-scroll no-scrollbar items-center">
            @for (card of two.hand; track $index) {
              <li>
                @if ($reveal()) {
                  <img class="object-contain rounded-md max-h-24" alt="Grand Archive Card" src="cards/{{card}}.jpg"
                       (mouseenter)="hover$.next(card)"
                       (mouseleave)="hover$.next('')"/>
                } @else {
                  <img class="object-contain rounded-md max-h-24" alt="Grand Archive Card" src="{{blank}}"/>
                }
              </li>
            }
          </ol>
          <p class="absolute bottom-2 right-2 text-sm text-white">Hand</p>
        </div>
        <div class="order-3 relative w-full h-full col-span-1 row-span-2"
             (click)="$reveal() && focus$.next(['two', 'memory'])">
          <img class="object-contain rounded-md" alt="Grand Archive Card" src="{{blank}}"/>
          <p class="absolute top-2 left-2 text-md text-white">Memory</p>
          <p class="absolute bottom-2 right-2 text-2xl text-white font-bold">x {{ two.memory.length }}</p>
        </div>
        <div class="order-7 relative w-full h-full col-span-1 row-span-2"
             (click)="focus$.next(['two', 'champion'])">
          @if ($champion().two; as champion) {
            <img class="object-contain rounded-md" alt="Grand Archive Card" src="cards/{{champion}}.jpg"
                 (mouseenter)="hover$.next(champion)"
                 (mouseleave)="hover$.next('')"/>
          }
        </div>
        <div class="order-6 relative w-full h-full col-span-8 row-span-4 border-b-2 border-dashed border-white rounded-t-2xl"
             (click)="focus$.next(['two', 'field'])">
        </div>
        <div class="order-9 relative w-full h-full col-span-1 row-span-2 border-2 border-dashed border-white rounded-2xl">
          <div class="w-full h-full content-center text-white font-medium text-3xl text-center">
            <p class="py-2">15</p>
            <hr>
            <p class="py-2">15</p>
          </div>
        </div>
        <div class="order-10 relative w-full h-full col-span-1 row-span-2 border-2 border-dashed border-white rounded-2xl">
          <div class="w-full h-full content-center text-white font-medium text-xl text-center">
            <p class="py-4">Turn - {{ $turn() }}</p>
            <hr>
            <p class="py-4">{{ $phase() | titlecase }}</p>
          </div>
        </div>
        <div class="order-15 relative w-full h-full col-span-1 row-span-2"
             (click)="focus$.next(['one', 'material'])">
          <img class="object-contain rounded-md" alt="Grand Archive Card" src="{{blank}}"/>
          <p class="absolute top-2 left-2 text-md text-white">Material</p>
          <p class="absolute bottom-2 right-2 text-2xl text-white font-bold">x {{ one.deck.length }}</p>
        </div>
        <div class="order-16 relative w-full h-full col-span-1 row-span-2"
             (click)="focus$.next(['one', 'deck'])">
          <img class="object-contain rounded-md" alt="Grand Archive Card" src="{{blank}}"/>
          <p class="absolute top-2 left-2 text-md text-white">Deck</p>
          <p class="absolute bottom-2 right-2 text-2xl text-white font-bold">x {{ one.deck.length }}</p>
        </div>
        <div class="order-14 relative w-full h-full col-span-1 row-span-2"
             (click)="focus$.next(['one', 'graveyard'])">
          @if (one.graveyard.length === 0) {
            <img class="object-contain rounded-md" alt="Grand Archive Card" src="{{blank}}"/>
          } @else {
            <img class="object-contain rounded-md" alt="Grand Archive Card" src="cards/{{one.graveyard[0]}}"/>
          }
          <p class="absolute top-2 left-2 text-md text-white">Graveyard</p>
          <p class="absolute bottom-2 right-2 text-2xl text-white font-bold">x {{ one.graveyard.length }}</p>
        </div>
        <div class="order-12 relative w-full h-full col-span-1 row-span-2"
             (click)="focus$.next(['one', 'banish'])">
          @if (one.banish.length === 0) {
            <img class="object-contain rounded-md" alt="Grand Archive Card" src="{{blank}}"/>
          } @else {
            <img class="object-contain rounded-md" alt="Grand Archive Card" src="cards/{{one.banish[0]}}"/>
          }
          <p class="absolute top-2 left-2 text-md text-white">Banished</p>
          <p class="absolute bottom-2 right-2 text-2xl text-white font-bold">x {{ one.banish.length }}</p>
        </div>
        <div class="order-13 relative w-full h-full col-span-1 row-span-2"
             (click)="focus$.next(['one', 'champion'])">
          @if ($champion().one; as champion) {
            <img class="object-contain rounded" alt="Grand Archive Card" src="cards/{{champion}}.jpg"
                 (mouseenter)="hover$.next(champion)"
                 (mouseleave)="hover$.next('')"/>
          }
        </div>
        <div class="order-11 relative w-full h-full col-span-8 row-span-6 border-t-2 border-dashed border-white rounded-b-2xl"
             (click)="focus$.next(['one', 'field'])">
        </div>
      </div>
      <div class="col-span-4 row-span-9">
        @if ($focus(); as selection) {
          <h1 class="text-white font-bold p-4 text-2xl">Player {{ selection[0] | titlecase }} - {{ selection[1] | titlecase }}</h1>
        }
        <div class="grid grid-cols-4 w-full gap-2 max-h-180 overflow-scroll no-scrollbar">
          @for (card of $display(); track $index) {
            <img class="object-contain rounded-md max-h-60" alt="Grand Archive Card" src="cards/{{card}}.jpg"
                 (mouseenter)="hover$.next(card)"
                 (mouseleave)="hover$.next('')"/>
          }
        </div>
      </div>
      <div class="grid grid-cols-12 h-full w-full gap-x-8 col-span-12 row-span-3">
        @for (card of one.hand; track $index) {
          <img class="object-contain rounded-md" alt="Grand Archive Card" src="cards/{{card}}.jpg"
               (mouseenter)="hover$.next(card)"
               (mouseleave)="hover$.next('')"/>
        }
        @for (card of one.memory; track $index) {
          <img class="object-contain rounded-md opacity-30" alt="Grand Archive Card" src="cards/{{card}}.jpg"
               (mouseenter)="hover$.next(card)"
               (mouseleave)="hover$.next('')"/>
        }
      </div>
    </div>
  `
})
export class PuzzlePage {
  #StateManager = inject(StateManager);

  readonly blank = 'cards/grand-archive-back-of-card.jpg';

  hover$ = this.#StateManager.hover$;
  focus$ = this.#StateManager.focus$;
  move$ = this.#StateManager.move$;

  $focus = this.#StateManager.$focus;
  $hover = this.#StateManager.$hover;
  $display = this.#StateManager.$display;
  $champion = this.#StateManager.$champion;
  $turn = this.#StateManager.$turn;
  $phase = this.#StateManager.$phase;
  $one = this.#StateManager.$one;
  $two = this.#StateManager.$two;
  $reveal = this.#StateManager.$reveal;
}
