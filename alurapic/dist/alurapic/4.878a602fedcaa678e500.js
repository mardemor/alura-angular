(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"ct+p":function(e,r,t){"use strict";t.r(r),t.d(r,"HomeModule",function(){return Y});var n=t("3Pt+"),s=t("ofXK"),u=t("tyNb"),l=t("AJ3Z"),i=t("fXoL"),o=t("ryO2");let a=(()=>{class e{constructor(e,r){this.userService=e,this.router=r}canActivate(e,r){return!this.userService.isLogged()||(this.router.navigate(["user",this.userService.getUserName()]),!1)}}return e.\u0275fac=function(r){return new(r||e)(i.Qb(o.a),i.Qb(u.d))},e.\u0275prov=i.Fb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})(),c=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=i.Db({type:e,selectors:[["ng-component"]],decls:6,vars:0,consts:[[1,"container"],[1,"row"],[1,"col-md-6","mb-2"],["src","/assets/img/home.jpg","alt","Welcome",1,"img-fluid","d-none","d-sm-block"],[1,"col-md-6"]],template:function(e,r){1&e&&(i.Mb(0,"div",0),i.Mb(1,"div",1),i.Mb(2,"div",2),i.Kb(3,"img",3),i.Lb(),i.Mb(4,"div",4),i.Kb(5,"router-outlet"),i.Lb(),i.Lb(),i.Lb())},directives:[u.h],encapsulation:2}),e})();var m=t("vkgz"),p=t("AytR"),g=t("tk/3");const b=p.a.ApiUrl;let d=(()=>{class e{constructor(e,r){this.http=e,this.userService=r}authenticate(e,r){return this.http.post(b+"/user/login",{userName:e,password:r},{observe:"response"}).pipe(Object(m.a)(r=>{const t=r.headers.get("x-access-token");t&&(this.userService.setToken(t),console.log(`User ${e} authenticated with token ${t}`))}))}}return e.\u0275fac=function(r){return new(r||e)(i.Qb(g.b),i.Qb(o.a))},e.\u0275prov=i.Fb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var f=t("QynK"),v=t("EY5G"),h=t("xX17");const w=["userNameInput"];function x(e,r){1&e&&i.Kb(0,"app-vmessage",11)}function I(e,r){1&e&&i.Kb(0,"app-vmessage",12)}const y=function(){return["signup"]};let F=(()=>{class e{constructor(e,r,t,n,s,u){this.builder=e,this.authService=r,this.router=t,this.platformService=n,this.activatedRoute=s,this.alertService=u,this.fromUrl=""}ngOnInit(){var e;this.activatedRoute.queryParams.subscribe(e=>{this.fromUrl=e.fromUrl}),this.loginForm=this.builder.group({userName:["",n.j.required],password:["",n.j.required]}),this.platformService.isPlatformBrowser()&&(null===(e=this.userNameInput)||void 0===e||e.nativeElement.focus())}login(){var e,r;const t=null===(e=this.loginForm.get("userName"))||void 0===e?void 0:e.value,n=null===(r=this.loginForm.get("password"))||void 0===r?void 0:r.value;this.authService.authenticate(t,n).subscribe(()=>{this.fromUrl?this.router.navigateByUrl(this.fromUrl):this.router.navigate(["user",t])},e=>{this.alertService.danger("Invalid data.",!0),this.loginForm.reset(),this.platformService.isPlatformBrowser()&&this.userNameInput.nativeElement.focus()})}}return e.\u0275fac=function(r){return new(r||e)(i.Jb(n.c),i.Jb(d),i.Jb(u.d),i.Jb(f.a),i.Jb(u.a),i.Jb(v.a))},e.\u0275cmp=i.Db({type:e,selectors:[["ng-component"]],viewQuery:function(e,r){if(1&e&&i.oc(w,1),2&e){let e;i.ec(e=i.Ub())&&(r.userNameInput=e.first)}},decls:17,vars:6,consts:[[1,"container"],[1,"text-center"],[1,"form","mt-4",3,"formGroup","submit"],[1,"form-group"],["formControlName","userName","placeholder","user name","autocomplete","username","autofocus","",1,"form-control"],["userNameInput",""],["text","User name is required!",4,"ngIf"],["formControlName","password","type","password","placeholder","password","autocomplete","current-password",1,"form-control"],["text","Password is required!",4,"ngIf"],["type","submit",1,"btn","btn-primary","btn-block",3,"disabled"],[3,"routerLink"],["text","User name is required!"],["text","Password is required!"]],template:function(e,r){if(1&e&&(i.Mb(0,"div",0),i.Mb(1,"h4",1),i.lc(2,"Login"),i.Lb(),i.Mb(3,"form",2),i.Tb("submit",function(){return r.login()}),i.Mb(4,"div",3),i.Kb(5,"input",4,5),i.jc(7,x,1,0,"app-vmessage",6),i.Lb(),i.Mb(8,"div",3),i.Kb(9,"input",7),i.jc(10,I,1,0,"app-vmessage",8),i.Lb(),i.Mb(11,"button",9),i.lc(12," login "),i.Lb(),i.Lb(),i.Mb(13,"p"),i.lc(14,"Not a user? "),i.Mb(15,"a",10),i.lc(16,"Register now"),i.Lb(),i.Lb(),i.Lb()),2&e){let e=null,t=null;i.yb(3),i.bc("formGroup",r.loginForm),i.yb(4),i.bc("ngIf",null==(e=r.loginForm.get("userName"))||null==e.errors?null:e.errors.required),i.yb(3),i.bc("ngIf",null==(t=r.loginForm.get("password"))||null==t.errors?null:t.errors.required),i.yb(1),i.bc("disabled",r.loginForm.invalid),i.yb(4),i.bc("routerLink",i.cc(5,y))}},directives:[n.k,n.h,n.e,n.b,n.g,n.d,s.l,u.f,h.a],encapsulation:2}),e})();function N(e){return e.value.trim()&&!/^[a-z0-9_\-]+$/.test(e.value)?{lowercase:!0}:null}var j=t("Kj3r"),L=t("eIep"),M=t("lJxs"),k=t("SxV6");const K=p.a.ApiUrl;let S=(()=>{class e{constructor(e){this.http=e}checkUserNameTaken(e){return this.http.get(K+"/user/exists/"+e)}signup(e){return this.http.post(K+"/user/signup",e)}}return e.\u0275fac=function(r){return new(r||e)(i.Qb(g.b))},e.\u0275prov=i.Fb({token:e,factory:e.\u0275fac}),e})(),U=(()=>{class e{constructor(e){this.signupService=e}checkUserNameTaken(){return e=>e.valueChanges.pipe(Object(j.a)(300)).pipe(Object(L.a)(e=>this.signupService.checkUserNameTaken(e))).pipe(Object(M.a)(e=>e?{userNameTaken:!0}:null)).pipe(Object(k.a)())}}return e.\u0275fac=function(r){return new(r||e)(i.Qb(S))},e.\u0275prov=i.Fb({token:e,factory:e.\u0275fac}),e})();const q=e=>{var r,t;const n=null===(r=e.get("userName"))||void 0===r?void 0:r.value,s=null===(t=e.get("password"))||void 0===t?void 0:t.value;return n.length+s.length>0&&n==s?{usernamePassword:!0}:null},J=["emailInput"];function T(e,r){1&e&&i.Kb(0,"app-vmessage",26)}function P(e,r){1&e&&i.Kb(0,"app-vmessage",27)}function Q(e,r){1&e&&i.Kb(0,"app-vmessage",28)}function A(e,r){1&e&&i.Kb(0,"app-vmessage",29)}function C(e,r){1&e&&i.Kb(0,"app-vmessage",30)}function O(e,r){1&e&&i.Kb(0,"app-vmessage",31)}function G(e,r){1&e&&i.Kb(0,"app-vmessage",29)}function R(e,r){1&e&&i.Kb(0,"app-vmessage",32)}function B(e,r){1&e&&i.Kb(0,"app-vmessage",33)}function E(e,r){1&e&&i.Kb(0,"app-vmessage",34)}function D(e,r){1&e&&(i.Mb(0,"small",35),i.lc(1,"User available"),i.Lb())}function V(e,r){1&e&&i.Kb(0,"app-vmessage",36)}function H(e,r){1&e&&i.Kb(0,"app-vmessage",37)}function X(e,r){1&e&&i.Kb(0,"app-vmessage",38)}function $(e,r){1&e&&i.Kb(0,"app-vmessage",39)}const z=[{path:"",component:c,canActivate:[a],children:[{path:"",component:F,data:{title:"Sign in"}},{path:"signup",component:(()=>{class e{constructor(e,r,t,n,s,u){this.formBuilder=e,this.userNotTakenValidatorService=r,this.signupService=t,this.router=n,this.platformDetectorService=s,this.alertService=u}ngOnInit(){var e;this.signupForm=this.formBuilder.group({email:["",[n.j.required,n.j.email]],fullName:["",[n.j.required,n.j.minLength(2),n.j.maxLength(40)]],userName:["",[n.j.required,N,n.j.minLength(2),n.j.maxLength(30)],this.userNotTakenValidatorService.checkUserNameTaken()],password:["",[n.j.required,n.j.minLength(8),n.j.maxLength(14)]]},{validator:q}),this.platformDetectorService.isPlatformBrowser()&&(null===(e=this.emailInput)||void 0===e||e.nativeElement.focus())}signup(){if(!this.signupForm.invalid&&!this.signupForm.pending){const e=this.signupForm.getRawValue();this.signupService.signup(e).subscribe(()=>{this.router.navigate([""]),this.alertService.success("User created successfully.",!0)},e=>{console.log(e.message),this.alertService.danger("User could not be created. Try later...",!0)})}}}return e.\u0275fac=function(r){return new(r||e)(i.Jb(n.c),i.Jb(U),i.Jb(S),i.Jb(u.d),i.Jb(f.a),i.Jb(v.a))},e.\u0275cmp=i.Db({type:e,selectors:[["ng-component"]],viewQuery:function(e,r){if(1&e&&i.oc(J,1),2&e){let e;i.ec(e=i.Ub())&&(r.emailInput=e.first)}},features:[i.xb([U])],decls:35,vars:16,consts:[[1,"text-center"],[1,"container"],[1,"form","mt-4",3,"formGroup","submit"],["form","ngForm"],[1,"form-group"],["formControlName","email","placeholder","email","autofocus","",1,"form-control"],["emailInput",""],["text","Email is required!",4,"ngIf"],["text","Invalid e-mail",4,"ngIf"],["formControlName","fullName","placeholder","full name",1,"form-control"],["text","Full name is required!",4,"ngIf"],["text","Minimum length is 2",4,"ngIf"],["text","Maximum length is 40",4,"ngIf"],["formControlName","userName","placeholder","user name","autocomplete","username",1,"form-control"],["text","Username is required!",4,"ngIf"],["text","Maximum length is 30",4,"ngIf"],["text","Must be lowercase",4,"ngIf"],["text","Username already taken",4,"ngIf"],["class","text-success",4,"ngIf"],["formControlName","password","type","password","placeholder","password","autocomplete","current-password",1,"form-control"],["text","Password is required!",4,"ngIf"],["text","Minimum length is 8",4,"ngIf"],["text","Maximum length is 14",4,"ngIf"],["text","User name and password must be different",4,"ngIf"],[1,"btn","btn-primary","btn-block"],["routerLink","/","routerLinkActive","active"],["text","Email is required!"],["text","Invalid e-mail"],["text","Full name is required!"],["text","Minimum length is 2"],["text","Maximum length is 40"],["text","Username is required!"],["text","Maximum length is 30"],["text","Must be lowercase"],["text","Username already taken"],[1,"text-success"],["text","Password is required!"],["text","Minimum length is 8"],["text","Maximum length is 14"],["text","User name and password must be different"]],template:function(e,r){if(1&e&&(i.Mb(0,"h4",0),i.lc(1," Register to embrace a new world!"),i.Lb(),i.Mb(2,"div",1),i.Mb(3,"form",2,3),i.Tb("submit",function(){return r.signup()}),i.Mb(5,"div",4),i.Kb(6,"input",5,6),i.jc(8,T,1,0,"app-vmessage",7),i.jc(9,P,1,0,"app-vmessage",8),i.Lb(),i.Mb(10,"div",4),i.Kb(11,"input",9),i.jc(12,Q,1,0,"app-vmessage",10),i.jc(13,A,1,0,"app-vmessage",11),i.jc(14,C,1,0,"app-vmessage",12),i.Lb(),i.Mb(15,"div",4),i.Kb(16,"input",13),i.jc(17,O,1,0,"app-vmessage",14),i.jc(18,G,1,0,"app-vmessage",11),i.jc(19,R,1,0,"app-vmessage",15),i.jc(20,B,1,0,"app-vmessage",16),i.jc(21,E,1,0,"app-vmessage",17),i.jc(22,D,2,0,"small",18),i.Lb(),i.Mb(23,"div",4),i.Kb(24,"input",19),i.jc(25,V,1,0,"app-vmessage",20),i.jc(26,H,1,0,"app-vmessage",21),i.jc(27,X,1,0,"app-vmessage",22),i.jc(28,$,1,0,"app-vmessage",23),i.Lb(),i.Mb(29,"button",24),i.lc(30,"Register"),i.Lb(),i.Mb(31,"p"),i.lc(32,"Already a user? "),i.Mb(33,"a",25),i.lc(34,"Sign In!"),i.Lb(),i.Lb(),i.Lb(),i.Lb()),2&e){const e=i.fc(4);let t=null,n=null,s=null,u=null,l=null,o=null,a=null,c=null,m=null,p=null,g=null,b=null,d=null,f=null;i.yb(3),i.bc("formGroup",r.signupForm),i.yb(5),i.bc("ngIf",(null==(t=r.signupForm.get("email"))||null==t.errors?null:t.errors.required)&&(e.submitted||(null==(t=r.signupForm.get("email"))?null:t.touched))),i.yb(1),i.bc("ngIf",(null==(n=r.signupForm.get("email"))||null==n.errors?null:n.errors.email)&&(e.submitted||(null==(n=r.signupForm.get("email"))?null:n.touched))),i.yb(3),i.bc("ngIf",(null==(s=r.signupForm.get("fullName"))||null==s.errors?null:s.errors.required)&&(e.submitted||(null==(s=r.signupForm.get("fullName"))?null:s.touched))),i.yb(1),i.bc("ngIf",(null==(u=r.signupForm.get("fullName"))||null==u.errors?null:u.errors.minlength)&&(e.submitted||(null==(u=r.signupForm.get("fullName"))?null:u.touched))),i.yb(1),i.bc("ngIf",(null==(l=r.signupForm.get("fullName"))||null==l.errors?null:l.errors.maxlength)&&(e.submitted||(null==(l=r.signupForm.get("fullName"))?null:l.touched))),i.yb(3),i.bc("ngIf",(null==(o=r.signupForm.get("userName"))||null==o.errors?null:o.errors.required)&&(e.submitted||(null==(o=r.signupForm.get("userName"))?null:o.touched))),i.yb(1),i.bc("ngIf",(null==(a=r.signupForm.get("userName"))||null==a.errors?null:a.errors.minlength)&&(e.submitted||(null==(a=r.signupForm.get("userName"))?null:a.touched))),i.yb(1),i.bc("ngIf",(null==(c=r.signupForm.get("userName"))||null==c.errors?null:c.errors.maxlength)&&(e.submitted||(null==(c=r.signupForm.get("userName"))?null:c.touched))),i.yb(1),i.bc("ngIf",(null==(m=r.signupForm.get("userName"))||null==m.errors?null:m.errors.lowercase)&&(e.submitted||(null==(m=r.signupForm.get("userName"))?null:m.touched))),i.yb(1),i.bc("ngIf",null==(p=r.signupForm.get("userName"))||null==p.errors?null:p.errors.userNameTaken),i.yb(1),i.bc("ngIf",null==(g=r.signupForm.get("userName"))?null:g.valid),i.yb(3),i.bc("ngIf",(null==(b=r.signupForm.get("password"))||null==b.errors?null:b.errors.required)&&(e.submitted||(null==(b=r.signupForm.get("password"))?null:b.touched))),i.yb(1),i.bc("ngIf",(null==(d=r.signupForm.get("password"))||null==d.errors?null:d.errors.minlength)&&(e.submitted||(null==(d=r.signupForm.get("password"))?null:d.touched))),i.yb(1),i.bc("ngIf",(null==(f=r.signupForm.get("password"))||null==f.errors?null:f.errors.maxlength)&&(e.submitted||(null==(f=r.signupForm.get("password"))?null:f.touched))),i.yb(1),i.bc("ngIf",(null==r.signupForm.errors?null:r.signupForm.errors.usernamePassword)&&e.submitted)}},directives:[n.k,n.h,n.e,n.b,n.g,n.d,s.l,u.f,u.e,h.a],encapsulation:2}),e})(),data:{title:"Sign up"}}]}];let W=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=i.Hb({type:e}),e.\u0275inj=i.Gb({imports:[[u.g.forChild(z)],u.g]}),e})(),Y=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=i.Hb({type:e}),e.\u0275inj=i.Gb({providers:[S],imports:[[n.i,s.c,l.a,u.g,W]]}),e})()}}]);