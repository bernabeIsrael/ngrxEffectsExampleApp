import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as usersActions from "../actions";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";


@Injectable()
export class UsersEffects {
  constructor(private action$: Actions,
              private userService: UserService) {
  }

  loadUsers$ = createEffect(
    () => this.action$.pipe(
      ofType(usersActions.loadUsers),
      mergeMap(
        () => this.userService.getUsers()
          .pipe(
            map(users => usersActions.loadUsersSuccess({users: users})),
            catchError(err => of(usersActions.loadUsersError({payload: err})))
          )
      )
    )
  );
}
