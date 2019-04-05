import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES} from '../mock-heroes'; サービスによる取得に変更したので、不要になった。代わりに以下の一行を追加
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  constructor(private heroService: HeroService) { } // プロパティとして、ヒーローサービスクラスを宣言

  ngOnInit() { // コンストラクタではなく、こちらで呼び出す　（ngOnInitライフサイクルフック内）
    this.getHeroes();
  }
  onSelect(hero: Hero): void { // heroを選択したら別ページに遷移するようにしたのでもう使用しない。
    this.selectedHero = hero;
  }
  // getHeroes(): void {
  //  this.heroes = this.heroService.getHeroes(); // ヒーローサービスのメソッドを使ってHero型の配列を取得（非同期の実装に伴い以下に書き直し）
  // }
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
  add(name: string): void {
    name = name.trim(); // 前後の空白を取り除くメソッド
    if (!name) { return; } // 空文字のときは何も返さない
    console.log( 'add関数の実行時のid:  ' + ({name} as Hero).id);
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero); // 引数のheroオブジェクトを除いたものを、Hero配列として初期化
    this.heroService.deleteHero(hero).subscribe();
  }

}


