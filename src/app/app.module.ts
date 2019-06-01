import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ViewComponent } from './components/view/view.component';
import { DataService } from './shared/data.service';
import { AppRoutingModule } from './app-routing.module';
import { DataFilterService } from './shared/data-filter.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ViewComponent,
    HeaderComponent,
    FooterComponent,
    FilterPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DataService,
    DataFilterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
