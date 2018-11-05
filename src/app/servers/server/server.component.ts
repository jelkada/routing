
import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})

export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
  	          private activatedRoute: ActivatedRoute,
              private router: Router) { 
  }

  ngOnInit() {

    // alernative way to get the server using the resolver
    this.activatedRoute.data.subscribe(
       (params: Params) => { this.server = params['server'] }
    );

    // this.server = this.serversService.getServer( Number(this.activatedRoute.snapshot.params['id']) );
    // this.activatedRoute.params.subscribe(
    //   (params: Params) => { this.server = this.serversService.getServer(+params['id']) }
    // );
  }

  onEdit() {
    if ( this.activatedRoute.snapshot.params['id'] === '1' )
         this.router.navigate(['/servers', this.activatedRoute.snapshot.params['id'], 'edit'], { queryParams: {'allowEdit':'1'} } );
    else this.router.navigate(['/servers', this.activatedRoute.snapshot.params['id'], 'edit'], { queryParams: {'allowEdit':'0'} } );
    // OR This: this.router.navigate( ['edit'], {relativeTo:this.activatedRoute} );
  }

}
