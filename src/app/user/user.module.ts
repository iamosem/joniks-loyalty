import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserDeactivateDialogComponent, UserDeactivatePopupComponent } from './deactivate/user-deactivate-dialog.component';
import { UserListComponent } from './list/user-list.component';
import { userPopupRoute, userRoutes } from './user.route';
import { UserAddComponent } from './add/user-add.component';
import { UserEditComponent } from './edit/user-edit.component';

@NgModule({
    imports: [SharedModule, RouterModule.forChild([...userRoutes, userPopupRoute])],
    declarations: [
        UserListComponent,
        UserAddComponent,
        UserEditComponent,
        UserDeactivateDialogComponent,
        UserDeactivatePopupComponent
    ],
    entryComponents: [
        UserDeactivateDialogComponent
    ]
})
export class UserModule { }
