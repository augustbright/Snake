import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval, timer } from 'rxjs';

type TBlock = {
  row: number;
  column: number;
};

type TFruit = {
  row: number;
  column: number;
};

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css'],
})
export class WindowComponent implements OnInit {
  tickInterval = 200;
  rows: number = 20;
  columns: number = 20;
  blocks: Array<TBlock> = [];
  fruits: Array<TFruit> = [];

  speedRow: number = 0;
  speedColumn: number = 0;
  blockReserve: number = 0;

  debug: string = '';

  tickSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.initGame();
  }

  initGame() {
    this.blocks = [
      {
        column: Math.floor(this.columns / 2),
        row: Math.floor(this.rows / 2),
      },
    ];
    this.fruits = [];

    this.addFruit();

    this.speedColumn = 0;
    this.speedRow = 0;
  }

  handleKeyDown(event: KeyboardEvent) {
    this.debug = event.key;

    if (event.key === 'ArrowUp' && this.speedRow === 0) {
      this.speedColumn = 0;
      this.speedRow = -1;
      this.initTick();
    }
    if (event.key === 'ArrowDown' && this.speedRow === 0) {
      this.speedColumn = 0;
      this.speedRow = 1;
      this.initTick();
    }
    if (event.key === 'ArrowLeft' && this.speedColumn === 0) {
      this.speedColumn = -1;
      this.speedRow = 0;
      this.initTick();
    }
    if (event.key === 'ArrowRight' && this.speedColumn === 0) {
      this.speedColumn = 1;
      this.speedRow = 0;
      this.initTick();
    }
  }

  initTick() {
    if (this.tickSubscription) {
      this.tickSubscription.unsubscribe();
      this.tickSubscription = null;
    }
    this.tickSubscription = timer(0, this.tickInterval).subscribe(() => {
      this.move();
    });
  }

  move() {
    const tailRow = this.blocks.at(-1)!.row;
    const tailColumn = this.blocks.at(-1)!.column;

    for (let i = this.blocks.length - 1; i > 0; i--) {
      this.blocks[i].column = this.blocks[i - 1].column;
      this.blocks[i].row = this.blocks[i - 1].row;
    }
    this.blocks[0].column += this.speedColumn;
    this.blocks[0].row += this.speedRow;

    if (this.blockReserve > 0) {
      this.blocks.push({
        row: tailRow,
        column: tailColumn,
      });
      this.blockReserve -= 1;
    }

    this.checkFruitCollision();
  }

  addFruit() {
    let cell = this.getRandomCell();

    while (this.isAnythingInCell(cell.row, cell.column)) {
      cell = this.getRandomCell();
    }

    this.fruits.push(cell);
  }

  checkFruitCollision() {
    const fruitIndex = this.fruits.findIndex(
      (fruit) =>
        fruit.column === this.blocks[0].column &&
        fruit.row === this.blocks[0].row
    );

    if (fruitIndex > -1) {
      this.blockReserve += 1;
      this.fruits.splice(fruitIndex, 1);
      this.addFruit();
    }
  }

  checkBodyCollision() {}

  getRandomCell() {
    return {
      row: Math.floor(Math.random() * this.rows + 1),
      column: Math.floor(Math.random() * this.columns + 1),
    };
  }

  isAnythingInCell(row: number, column: number) {
    return this.isBlockInCell(row, column) || this.isFruitInCell(row, column);
  }

  isBlockInCell(row: number, column: number) {
    return this.blocks.some(
      (block) => block.column === column && block.row === row
    );
  }

  isFruitInCell(row: number, column: number) {
    return this.fruits.some(
      (fruit) => fruit.column === column && fruit.row === row
    );
  }

  getBlockStyle(block: TBlock) {
    return (
      block.row +
      '/' +
      block.column +
      '/' +
      (block.row + 1) +
      '/' +
      (block.column + 1)
    );
  }

  get fruitsDebug() {
    return JSON.stringify(this.fruits, null, 3);
  }
  get blocksDebug() {
    return JSON.stringify(this.fruits, null, 3);
  }
}
