import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-clientlayout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './clientlayout.html',
  styleUrl: './clientlayout.css',
})
export class Clientlayout {}
