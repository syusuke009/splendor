import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitlePageComponent } from './title-page/title-page.component';
import { GameFieldComponent } from './game-field/game-field.component';
import { AssetLineComponent } from './game-field/asset-line/asset-line.component';
import { TipSingleSelectDialogComponent } from './game-field/tip-single-select-dialog/tip-single-select-dialog.component';
import { TipMultiSelectDialogComponent } from './game-field/tip-multi-select-dialog/tip-multi-select-dialog.component';
import { CardComponent } from './game-field/card/card.component';
import { RearCardComponent } from './game-field/rear-card/rear-card.component';
import { TileComponent } from './game-field/tile/tile.component';
import { PlayersInputComponent } from './title-page/players-input/players-input.component';
import { GamesetSlideComponent } from './game-field/gameset-slide/gameset-slide.component';
import { TipReleaseDialogComponent } from './game-field/tip-release-dialog/tip-release-dialog.component';
import { NobleSelectDialogComponent } from './game-field/noble-select-dialog/noble-select-dialog.component';
import { LogDisplayComponent } from './game-field/log-display/log-display.component';
import { HelpComponent } from './game-field/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    TitlePageComponent,
    GameFieldComponent,
    AssetLineComponent,
    TipSingleSelectDialogComponent,
    TipMultiSelectDialogComponent,
    CardComponent,
    RearCardComponent,
    TileComponent,
    PlayersInputComponent,
    GamesetSlideComponent,
    TipReleaseDialogComponent,
    NobleSelectDialogComponent,
    LogDisplayComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
