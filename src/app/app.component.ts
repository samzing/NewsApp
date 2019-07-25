import { Component } from '@angular/core';
import { NewsApiService } from './news-api.service';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	mArticles:Array<any>;
	bookmarkedArticles:Array<any> = [];
	mCategories: Array<any> = [{"nameToShow":"General", "originalName":"general"},
	{"nameToShow":"Technology", "originalName":"technology" },
	{"nameToShow":"Sports", "originalName":"sports" },
	{"nameToShow":"Business", "originalName":"business" },
	{"nameToShow":"Entertainment", "originalName":"entertainment" }];
	query: string;
	opened: boolean;
	isBookmarksClose: boolean;
	
	constructor(private newsapi:NewsApiService){      
	}

	ngOnInit() {
	    this.newsapi.initArticles().subscribe(data => this.mArticles = data['articles']);
		this.query = "";	
		this.isBookmarksClose = true;
	}
	
	goToHome(){
		this.newsapi.initArticles().subscribe(data => this.mArticles = data['articles']);
		this.isBookmarksClose = true;
		window.scrollTo(0,0);
	}

	searchArticlesByCategory(category){
		this.newsapi.getArticlesByCategory(category).subscribe(data => 
			this.mArticles = data['articles']);
		window.scrollTo(0,0);
	}

	searchArticlesByQuery(){

		this.newsapi.getArticlesByQuery(this.query).subscribe(data => 
			this.mArticles = data['articles']);
		window.scrollTo(0,0);
	}

	bookmarkArticle(article){
		this.bookmarkedArticles.push(article);
		alert("News Bookmarked! Go to bookmark section on top right corner to view this!");
	}

	showBookmarks(){
		if(this.bookmarkedArticles.length == 0){
			alert("You have no bookmarks!");
		}else{
			this.isBookmarksClose =false;
			this.mArticles = this.bookmarkedArticles;
			window.scrollTo(0,0);
		}	
	}

	unbookmarkArticle(article){
		const index: number = this.bookmarkedArticles.indexOf(article);
    	if (index !== -1) {
        	this.bookmarkedArticles.splice(index, 1);
   	 	}
		
		if(this.bookmarkedArticles.length == 0){
			alert("Bookmarks is empty now!");
			this.goToHome();
		}else{
			alert("Unsaved!");
		}
	}
  
}
