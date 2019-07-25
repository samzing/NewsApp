import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  
  api_key = 'fdc60fa0d1b44a38add6f9b1d381742d';
  constructor(private http:HttpClient) { }

  initArticles(){
   return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='+this.api_key);
  }

  getArticlesByCategory(category: String){
    return this.http.get('https://newsapi.org/v2/top-headlines?country=us&category='+category+'&apiKey='+this.api_key);
  }

  getArticlesByQuery(query: String){
    return this.http.get('https://newsapi.org/v2/everything?q='+query+'&apiKey='+this.api_key);
  }

}
