import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http'
import * as papa from 'papaparse';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  csvData: any[] = [];
  headerRow: any[] = [];
  
  exampleData: any[] = [];
  exampleHeader: any[] = [];

  constructor(public navCtrl: NavController, private http: Http) {
    this.readCsvData();
  }

  private readCsvData() {
    this.http.get('assets/dummyData2.csv')
      .subscribe(
        data => this.extractData(data),
        err => this.handleError(err)
      );
  }

  private extractData(res) {
    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;

    this.headerRow = parsedData[0];

    parsedData.splice(0, 1);
    this.csvData = parsedData;

    for(var i: number = 0; i < this.headerRow.length; i++) {
      console.log("This.headerrow " + this.headerRow[i]);
      for(var j: number = 0; j< this.headerRow[i].length; j++) {
        console.log("This.headerrow[] " + this.headerRow[i]);
      }
  }
  for(var i: number = 0; i < this.csvData.length; i++) {
    console.log("This.csvData " + this.csvData[i]);
    for(var j: number = 0; j< this.csvData[i].length; j++) {
      console.log("This.csvData[] " + this.csvData[i]);
    }
}
  }

  downloadCSV() {
    let csv = papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });

    // Dummy implementation for Desktop download purpose
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "newdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  downloadCSVexample() {  
    var titulos = [];
    var conteudo = [];
    var ini, end;

    for (ini = 0; ini < 5; ini++) {
        titulos.push("The header is " + ini );
        for (end = 0; end < 5; end++) {
          conteudo.push("The content is " + end )
        }
        this.exampleData.push(conteudo)
        conteudo = [];
        console.log(conteudo)
    }
    
    let csv = papa.unparse({
      fields: titulos,
      data: this.exampleData
    });

    // Dummy implementation for Desktop download purpose
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "newdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private handleError(err) {
    console.log('something went wrong: ', err);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
