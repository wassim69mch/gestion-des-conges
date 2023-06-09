import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "forgot-password", component: ForgotPasswordComponent },
	{
		path: "",
		redirectTo: "login",
		pathMatch: "full",
	},
	{
		path: "",
		canActivate: [AuthGuard],
		component: AdminLayoutComponent,
		children: [
			{
				path: "",
				loadChildren: () => import("./layouts/admin-layout/admin-layout.module").then((m) => m.AdminLayoutModule),
			},
		],
	},
];

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule.forRoot(routes, {
			useHash: true,
		}),
	],
	exports: [],
})
export class AppRoutingModule {}
