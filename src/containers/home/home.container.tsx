import { Post, Session } from '@src/core/models/type';
import { AppState } from '@src/core/store';
import { onReceiveBoard, onReceivePost } from '@src/core/store/reducer/session/actions';
import { SessionState } from '@src/core/store/reducer/session/types';
import { UserState } from '@src/core/store/reducer/user';
import React, { useEffect } from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Home } from './home.component';
import { HomeState } from './store/reducer/types';
import { onThunkCreateBoardReq, onThunkGetPrePublicBoardsReq } from './store/thunk';

export const HomeContainer: React.FunctionComponent<NavigationInjectedProps> = (props) => {
  const { user }: UserState = useSelector((state: AppState) => state.user);
  const { session }: SessionState = useSelector((state: AppState) => state.session);
  const { boards }: HomeState = useSelector((state: AppState) => state.home);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    onGetPrePublicBoards();
  }, []);

  const onBoardPress = (sessionId: string): void => {
    props.navigation.navigate({
      routeName: 'Board',
      params: {
        sessionId,
      }
    })
  };

  const receivePost = (post: Post): void => {
  }

  const receiveBoard = (board: Session): void => {
  }

  const onBackPress = (): void => {
    props.navigation.goBack();
  };

  const onGetBoardSuccess = (): void => {
  };

  const onGetBoardError = (): void => {
  };

  const onCreateBoardSuccess = (): void => {
    onGetPrePublicBoards();
  };


  const onGetPrePublicBoards = (): void => {
    dispatch(onThunkGetPrePublicBoardsReq(
      onGetBoardSuccess,
      onGetBoardError,
    ));
  };

  const onCreateBoard = (): void => {
    dispatch(onThunkCreateBoardReq(
      onCreateBoardSuccess,
      () => { },
    ));
  };

  return (
    <Home
      onBoardPress={onBoardPress}
      onCreateBoard={onCreateBoard}
      boards={boards}
      onReceiveBoard={receiveBoard}
      session={session}
      onReceivePost={receivePost}
      user={user}
      sessionId={'iQdhS78i7'}
      onBackPress={onBackPress}
      name={'asasd'} />
  );
};
