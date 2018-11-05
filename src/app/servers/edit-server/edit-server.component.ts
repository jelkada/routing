
import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})

export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  constructor(private serversService: ServersService, 
              private router:Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.server = this.serversService.getServer( Number(this.activatedRoute.snapshot.params['id']) );
    // get the server object when the URL changes
    this.activatedRoute.params.subscribe(
      (params: Params) => { this.server = this.serversService.getServer(+params['id']);
                            this.serverName = this.server.name;
                            this.serverStatus = this.server.status;
                          }
    );
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

  onLoadUsers() {
    //this.router.navigate(['../users']); - ok
    this.router.navigate(['../../../users'], {relativeTo:this.activatedRoute});
  }

}
