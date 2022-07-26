import React from 'react';
import { Portal } from '../portal';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { AccessTokenController } from '../../utilities/AccessTokenController';
import './styles.scss';

const accessTokenController = new AccessTokenController();

export const Header: React.FC = () => {
  const { onLogout } = React.useContext(AuthenticationContext);

  const userEmail = accessTokenController.getUserEmail();

  return (
    <Portal destination="before">
      <div className="header">
        {userEmail ? (
          <p className="header__welcomeMessage">{`Witaj, ${userEmail}`}</p>
        ) : null}
        <button className="header__logoutButton" onClick={onLogout}>
          Wyloguj
        </button>
      </div>
    </Portal>
  );
};
