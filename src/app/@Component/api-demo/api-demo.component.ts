import { FormsModule } from '@angular/forms';
import { HttpServiceService } from './../../@Service/http-service.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-api-demo',
  imports: [FormsModule,CommonModule],
  templateUrl: './api-demo.component.html',
  styleUrl: './api-demo.component.scss'
})
export class ApiDemoComponent {
selsctlocation: any;

  constructor(private htp:HttpServiceService){}
  Time$!:Observable <Date>;

  location!:any[];
  locName!:string;

  weather:any[]=[];
  selsctloca='';

   selectedLocation: any = undefined;
  ngOnInit(): void {
    this.htp.getApi(
      'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-065?Authorization=CWA-7D6724DB-2CFD-4706-8D7A-E559D8D80487&limit=5')
    .subscribe((res:any)=>{
      console.log(res);
      /*
        *天氣API中在recodes中僅有的資料叫做Locations
        程式中的location接收資料為Locations中的Location(各區天氣資料)
      */
      const loca=res.records.Locations[0];
      //取得API回傳資料中recoeds裡面的Locations陣列(程式裡真正需要的東西)
      this.locName=loca.LocationName;
      //取的Locations中的LocationName(雖然我也不知道為什麼要但後面好像會用到)
      this.location=loca.Location
      //程式所需變數location的值參照回傳資料中的Location
    })
    this.Time$=interval(1000).pipe(
      startWith(0),  // 立即顯示，不用等 1 秒
      map(() => new Date())
    );

  //   let posDate={
  //     username:'Allen',
  //     userage:18
  //   }

  //   this.htp.posApi('https://api.freeapi.app/api/v1/kitchen-sink/http-methods/post',posDate)
  //   .subscribe((res:any)=>{
  //     console.log(res);
  //   })
  }


  /**
   * 使用資料時可以讓API打包回傳即可
   * 需要使用或修改時再以for,map等語法實作
  */
  changeloca(location:any){//傳入參數叫location可能是任何型態
     console.log(location);
     this.selectedLocation = location;
    if(!location||!location.WeatherElement)//防呆，如果沒有傳入參數就直接結束方法
      return;
    this.selsctloca=location.LocationName;
    this.weather=location.WeatherElement;//將API中的WeatherElement資料打包回傳
    // console.log(this.weather)

     this.weather=location.WeatherElement.map((item:any)=>
     ({
       ...item,
       isChecked:true
     }));
  }

  updateDisplay() {
  console.log('已選擇:', this.getCheckedItems());
}

getCheckedItems() {
  return this.weather.filter(item => item.isChecked);
}

  //下拉選單顯示選項
  compareLocation(loc1:any,loc2:any):boolean{
    return loc1?.LocationName===loc2?.LocationName;
  }
}
