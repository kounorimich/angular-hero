import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero} from '../hero';
import { HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(private heroService: HeroService) { }
  search(term: string): void { // 検索語をobservableストリームにpushする
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300), // 各キーストロークの後、検索前に300ms待つ
      // distinctUntilChanged(), // 直前の検索語と同じ場合は無視する
      switchMap((term: string) => this.heroService.searchHeroes(term)), // 検索語が変わるたびに、新しい検索observableにスイッチする
    );
  }

}
