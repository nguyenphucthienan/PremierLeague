(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{zwkD:function(e,l,n){"use strict";n.r(l);var t=n("CcnG"),a=function(){},u=n("iutN"),o=n("z5nN"),i=n("atuK"),s=n("N07i"),r=n("pMnS"),d=n("gMr2"),c=n("gIcY"),p=n("QpxQ"),m=n("qSOI"),h=n("Okzp"),b=n("OhVH"),g=n("67Y/"),f=n("Kp1i"),v=n("sg7z"),y=function(){function e(e){this.matchService=e,this.columns=[{name:"round",text:"R.",type:"TextTableCellComponent",sortable:!0,center:!0},{name:"matchClubs",text:"Clubs",type:"MatchClubsTableCellComponent",sortable:!1},{name:"matchTime",text:"Match Time",type:"DateTimeTableCellComponent",sortable:!0},{name:"stadium",text:"Stadium",type:"ObjectTextTableCellComponent",sortable:!0},{name:"actions",text:"Actions",type:"ActionsTableCellComponent",sortable:!1}],this.pagination={pageNumber:1,pageSize:10},this.sortMode={sortBy:"matchTime",isSortAscending:!0},this.filterMode={isPlayed:!0},this.actions=[{class:"btn-primary",icon:"",text:"Detail",type:v.a.GetDetail}]}return e.prototype.getDataColumns=function(){return this.columns},e.prototype.getRawData=function(){var e=this;return this.matchService.getMatches(this.pagination,this.sortMode,this.filterMode).pipe(Object(g.a)(function(l){return e.pagination=l.pagination,l.items})).toPromise()},e.prototype.getDataRows=function(){return e=this,void 0,n=function(){var e=this;return function(e,l){var n,t,a,u,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return u={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function i(u){return function(i){return function(u){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,t&&(a=2&u[0]?t.return:u[0]?t.throw||((a=t.return)&&a.call(t),0):t.next)&&!(a=a.call(t,u[1])).done)return a;switch(t=0,a&&(u=[2&u[0],a.value]),u[0]){case 0:case 1:a=u;break;case 4:return o.label++,{value:u[1],done:!1};case 5:o.label++,t=u[1],u=[0];continue;case 7:u=o.ops.pop(),o.trys.pop();continue;default:if(!(a=(a=o.trys).length>0&&a[a.length-1])&&(6===u[0]||2===u[0])){o=0;continue}if(3===u[0]&&(!a||u[1]>a[0]&&u[1]<a[3])){o.label=u[1];break}if(6===u[0]&&o.label<a[1]){o.label=a[1],a=u;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(u);break}a[2]&&o.ops.pop(),o.trys.pop();continue}u=l.call(e,o)}catch(e){u=[6,e],t=0}finally{n=a=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,i])}}}(this,function(l){switch(l.label){case 0:return[4,this.getRawData().then(function(l){return e.rows=l.map(function(l){var n={};for(var t in l)l.hasOwnProperty(t)&&(n[t]="stadium"===t?{value:l[t],textProperty:"name"}:{value:l[t]});return n.matchClubs={value:{isPlayed:n.isPlayed.value,homeClub:n.homeClub.value,awayClub:n.awayClub.value,homeScore:n.homeScore.value,awayScore:n.awayScore.value}},n.actions={value:e.actions,showText:!0},{cells:n}}),e.rows})];case 1:return[2,l.sent()]}})},new((l=void 0)||(l=Promise))(function(t,a){function u(e){try{i(n.next(e))}catch(e){a(e)}}function o(e){try{i(n.throw(e))}catch(e){a(e)}}function i(e){e.done?t(e.value):new l(function(l){l(e.value)}).then(u,o)}i((n=n.apply(e,[])).next())});var e,l,n},e}(),T=function(){function e(e,l,n,t){this.router=e,this.route=l,this.resultsTableService=n,this.matchService=t}return e.prototype.ngOnInit=function(){var e=this;this.route.data.subscribe(function(l){e.seasons=l.seasons,e.currentSeason=e.seasons[0],e.seasonSelect.writeValue(e.seasons[0].id),e.resultsTableService.filterMode.seasonId=e.seasons[0].id}),this.getListRound()},e.prototype.onTableCellChanged=function(e){switch(e.newValue.type){case v.a.GetDetail:this.navigateToMatchDetail(e.row.cells.id.value)}},e.prototype.navigateToMatchDetail=function(e){this.router.navigate(["/matches",e])},e.prototype.getListRound=function(){var e=this;this.matchService.getListRounds(this.currentSeason.id).subscribe(function(l){e.rounds=l})},e.prototype.onSeasonFilterChanged=function(e){this.currentSeason=e,this.resultsTableService.filterMode.seasonId=e?e.id:null,this.resultsTableService.pagination={pageNumber:1,pageSize:10},this.getListRound(),this.datatable.refresh()},e.prototype.onRoundFilterChanged=function(e){this.resultsTableService.filterMode.round=e?e.id:null,this.resultsTableService.pagination={pageNumber:1,pageSize:10},this.datatable.refresh()},e}(),w=n("ZYCi"),S=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function C(e){return t["\u0275vid"](0,[t["\u0275qud"](402653184,1,{seasonSelect:0}),t["\u0275qud"](402653184,2,{datatable:0}),(e()(),t["\u0275eld"](2,0,null,null,46,"div",[["class","container mt-3 mb-4"]],null,null,null,null,null)),(e()(),t["\u0275eld"](3,0,null,null,1,"h1",[["class","text-center"]],null,null,null,null,null)),(e()(),t["\u0275ted"](-1,null,["Results"])),(e()(),t["\u0275eld"](5,0,null,null,40,"div",[["class","row mt-3"]],null,null,null,null,null)),(e()(),t["\u0275eld"](6,0,null,null,19,"div",[["class","col-lg-4 col-md-6"]],null,null,null,null,null)),(e()(),t["\u0275eld"](7,0,null,null,18,"div",[["class","d-flex flex-row align-items-center"]],null,null,null,null,null)),(e()(),t["\u0275eld"](8,0,null,null,2,"div",[["class","col-3"]],null,null,null,null,null)),(e()(),t["\u0275eld"](9,0,null,null,1,"span",[["class","font-weight-bold"]],null,null,null,null,null)),(e()(),t["\u0275ted"](-1,null,["Season: "])),(e()(),t["\u0275eld"](11,0,null,null,14,"div",[["class","col-9"]],null,null,null,null,null)),(e()(),t["\u0275eld"](12,0,null,null,13,"ng-select",[["bindLabel","name"],["bindValue","id"],["class","ng-select"],["placeholder","Select Season"],["role","listbox"]],[[2,"ng-select-single",null],[2,"ng-select-typeahead",null],[2,"ng-select-multiple",null],[2,"ng-select-taggable",null],[2,"ng-select-searchable",null],[2,"ng-select-opened",null],[2,"ng-select-disabled",null],[2,"ng-select-filtered",null]],[[null,"change"],[null,"keydown"]],function(e,l,n){var a=!0,u=e.component;return"keydown"===l&&(a=!1!==t["\u0275nov"](e,14).handleKeyDown(n)&&a),"change"===l&&(a=!1!==u.onSeasonFilterChanged(n)&&a),a},d.b,d.a)),t["\u0275prd"](5120,null,c.j,function(e){return[e]},[p.a]),t["\u0275did"](14,4964352,[[1,4],["seasonSelect",4]],11,p.a,[[8,null],[8,null],[8,null],p.b,p.d,t.ElementRef,t.ChangeDetectorRef,p.j],{items:[0,"items"],bindLabel:[1,"bindLabel"],bindValue:[2,"bindValue"],clearable:[3,"clearable"],placeholder:[4,"placeholder"],selectOnTab:[5,"selectOnTab"]},{changeEvent:"change"}),t["\u0275qud"](335544320,3,{optionTemplate:0}),t["\u0275qud"](335544320,4,{optgroupTemplate:0}),t["\u0275qud"](335544320,5,{labelTemplate:0}),t["\u0275qud"](335544320,6,{multiLabelTemplate:0}),t["\u0275qud"](335544320,7,{headerTemplate:0}),t["\u0275qud"](335544320,8,{footerTemplate:0}),t["\u0275qud"](335544320,9,{notFoundTemplate:0}),t["\u0275qud"](335544320,10,{typeToSearchTemplate:0}),t["\u0275qud"](335544320,11,{loadingTextTemplate:0}),t["\u0275qud"](335544320,12,{tagTemplate:0}),t["\u0275qud"](603979776,13,{ngOptions:1}),(e()(),t["\u0275eld"](26,0,null,null,19,"div",[["class","col-lg-4 col-md-6"]],null,null,null,null,null)),(e()(),t["\u0275eld"](27,0,null,null,18,"div",[["class","d-flex flex-row align-items-center"]],null,null,null,null,null)),(e()(),t["\u0275eld"](28,0,null,null,2,"div",[["class","col-3"]],null,null,null,null,null)),(e()(),t["\u0275eld"](29,0,null,null,1,"span",[["class","font-weight-bold"]],null,null,null,null,null)),(e()(),t["\u0275ted"](-1,null,["Round: "])),(e()(),t["\u0275eld"](31,0,null,null,14,"div",[["class","col-9"]],null,null,null,null,null)),(e()(),t["\u0275eld"](32,0,null,null,13,"ng-select",[["bindLabel","name"],["bindValue","id"],["class","ng-select"],["placeholder","Select Round"],["role","listbox"]],[[2,"ng-select-single",null],[2,"ng-select-typeahead",null],[2,"ng-select-multiple",null],[2,"ng-select-taggable",null],[2,"ng-select-searchable",null],[2,"ng-select-opened",null],[2,"ng-select-disabled",null],[2,"ng-select-filtered",null]],[[null,"change"],[null,"keydown"]],function(e,l,n){var a=!0,u=e.component;return"keydown"===l&&(a=!1!==t["\u0275nov"](e,34).handleKeyDown(n)&&a),"change"===l&&(a=!1!==u.onRoundFilterChanged(n)&&a),a},d.b,d.a)),t["\u0275prd"](5120,null,c.j,function(e){return[e]},[p.a]),t["\u0275did"](34,4964352,[["roundSelect",4]],11,p.a,[[8,null],[8,null],[8,null],p.b,p.d,t.ElementRef,t.ChangeDetectorRef,p.j],{items:[0,"items"],bindLabel:[1,"bindLabel"],bindValue:[2,"bindValue"],clearable:[3,"clearable"],placeholder:[4,"placeholder"],selectOnTab:[5,"selectOnTab"]},{changeEvent:"change"}),t["\u0275qud"](335544320,14,{optionTemplate:0}),t["\u0275qud"](335544320,15,{optgroupTemplate:0}),t["\u0275qud"](335544320,16,{labelTemplate:0}),t["\u0275qud"](335544320,17,{multiLabelTemplate:0}),t["\u0275qud"](335544320,18,{headerTemplate:0}),t["\u0275qud"](335544320,19,{footerTemplate:0}),t["\u0275qud"](335544320,20,{notFoundTemplate:0}),t["\u0275qud"](335544320,21,{typeToSearchTemplate:0}),t["\u0275qud"](335544320,22,{loadingTextTemplate:0}),t["\u0275qud"](335544320,23,{tagTemplate:0}),t["\u0275qud"](603979776,24,{ngOptions:1}),(e()(),t["\u0275eld"](46,0,null,null,2,"div",[["class","mt-3"]],null,null,null,null,null)),(e()(),t["\u0275eld"](47,0,null,null,1,"app-datatable",[],null,[[null,"cellChanged"]],function(e,l,n){var t=!0;return"cellChanged"===l&&(t=!1!==e.component.onTableCellChanged(n)&&t),t},m.b,m.a)),t["\u0275did"](48,114688,[[2,4]],0,h.a,[b.a],{tableService:[0,"tableService"]},{cellChanged:"cellChanged"})],function(e,l){var n=l.component;e(l,14,0,n.seasons,"name","id",!1,"Select Season",!0),e(l,34,0,n.rounds,"name","id",!0,"Select Round",!0),e(l,48,0,n.resultsTableService)},function(e,l){e(l,12,0,!t["\u0275nov"](l,14).multiple,t["\u0275nov"](l,14).typeahead,t["\u0275nov"](l,14).multiple,t["\u0275nov"](l,14).addTag,t["\u0275nov"](l,14).searchable,t["\u0275nov"](l,14).isOpen,t["\u0275nov"](l,14).disabled,t["\u0275nov"](l,14).filtered),e(l,32,0,!t["\u0275nov"](l,34).multiple,t["\u0275nov"](l,34).typeahead,t["\u0275nov"](l,34).multiple,t["\u0275nov"](l,34).addTag,t["\u0275nov"](l,34).searchable,t["\u0275nov"](l,34).isOpen,t["\u0275nov"](l,34).disabled,t["\u0275nov"](l,34).filtered)})}var R=t["\u0275ccf"]("app-results",T,function(e){return t["\u0275vid"](0,[(e()(),t["\u0275eld"](0,0,null,null,2,"app-results",[],null,null,null,C,S)),t["\u0275prd"](512,null,y,y,[f.a]),t["\u0275did"](2,114688,null,0,T,[w.k,w.a,y,f.a],null,null)],function(e,l){e(l,2,0)},null)},{},{},[]),x=n("Ip0R"),q=n("NJnL"),M=n("PGy5"),D=n("xtZt"),L=n("dXze"),k=n("YAQW"),O=n("DQlY"),F=n("ARl4"),N=n("0Rz3"),z=n("JfBm"),P=n("kfMT"),V=n("8ASg"),A=n("S6T7"),I=n("yD1i"),j=n("PCNd"),E=n("X3yp"),G=function(){},J=n("JG/o");n.d(l,"ResultsModuleNgFactory",function(){return Y});var Y=t["\u0275cmf"](a,[],function(e){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[u.a,o.a,o.b,i.a,i.b,s.a,r.a,R]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,x.NgLocalization,x.NgLocaleLocalization,[t.LOCALE_ID,[2,x["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,c.s,c.s,[]),t["\u0275mpd"](4608,c.e,c.e,[]),t["\u0275mpd"](4608,q.a,q.a,[]),t["\u0275mpd"](4608,M.a,M.a,[t.ComponentFactoryResolver,t.NgZone,t.Injector,q.a,t.ApplicationRef]),t["\u0275mpd"](4608,D.f,D.f,[]),t["\u0275mpd"](4608,L.c,L.c,[]),t["\u0275mpd"](4608,k.e,k.e,[]),t["\u0275mpd"](4608,O.b,O.b,[t.RendererFactory2,M.a]),t["\u0275mpd"](4608,F.w,F.w,[]),t["\u0275mpd"](4608,F.y,F.y,[]),t["\u0275mpd"](4608,F.a,F.a,[]),t["\u0275mpd"](4608,F.d,F.d,[]),t["\u0275mpd"](4608,F.e,F.e,[]),t["\u0275mpd"](4608,F.x,F.x,[F.y,F.e]),t["\u0275mpd"](4608,N.a,N.a,[]),t["\u0275mpd"](4608,z.a,z.a,[]),t["\u0275mpd"](4608,P.a,P.a,[]),t["\u0275mpd"](4608,V.a,V.a,[]),t["\u0275mpd"](4608,b.a,b.a,[]),t["\u0275mpd"](1073742336,x.CommonModule,x.CommonModule,[]),t["\u0275mpd"](1073742336,c.p,c.p,[]),t["\u0275mpd"](1073742336,c.h,c.h,[]),t["\u0275mpd"](1073742336,c.n,c.n,[]),t["\u0275mpd"](1073742336,p.c,p.c,[]),t["\u0275mpd"](1073742336,A.FileUploadModule,A.FileUploadModule,[]),t["\u0275mpd"](1073742336,D.e,D.e,[]),t["\u0275mpd"](1073742336,I.b,I.b,[]),t["\u0275mpd"](1073742336,L.d,L.d,[]),t["\u0275mpd"](1073742336,k.c,k.c,[]),t["\u0275mpd"](1073742336,O.e,O.e,[]),t["\u0275mpd"](1073742336,F.c,F.c,[]),t["\u0275mpd"](1073742336,j.a,j.a,[]),t["\u0275mpd"](1073742336,w.n,w.n,[[2,w.t],[2,w.k]]),t["\u0275mpd"](1073742336,G,G,[]),t["\u0275mpd"](1073742336,J.a,J.a,[]),t["\u0275mpd"](1073742336,a,a,[]),t["\u0275mpd"](256,p.d,p.e,[]),t["\u0275mpd"](256,D.a,{autoClose:!0},[]),t["\u0275mpd"](1024,w.i,function(){return[[{path:"",component:T,resolve:{seasons:E.a}}],[]]},[])])})}}]);