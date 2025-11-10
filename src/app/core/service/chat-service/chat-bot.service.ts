import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { Observable, filter, from, map } from 'rxjs';


const APIKEY = environment.openAI.apiKey;
@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
  private readonly openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({ apiKey: APIKEY });
    this.openai = new OpenAIApi(configuration);
  }

  getDataFromOpenAI(text: string): Observable<string> {
    return from(this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      max_tokens: 256,
      temperature: 0.7
    })).pipe(
      filter(resp => !!resp && !!resp.data),
      map(resp => resp.data),
      filter((data: any) => (
        data.choices && data.choices.length > 0 && data.choices[0].text
      )),
      map(data => data.choices[0].text.trim())
    );
  }
}
