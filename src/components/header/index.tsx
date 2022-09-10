import React from 'react';
import { AccessTokenController } from '../../utilities';
import './styles.scss';

const accessTokenController = new AccessTokenController();

interface HeaderInterface {
  onLogout: VoidFunction;
}

export const Header: React.FC<HeaderInterface> = ({ onLogout }) => {
  const userEmail = accessTokenController.getUserEmail();

  return (
    <div className="header">
      {userEmail ? (
        <p className="header__welcomeMessage">{`Witaj, ${userEmail}`}</p>
      ) : null}
      <button className="header__logoutButton" onClick={onLogout}>
        Wyloguj
      </button>
    </div>
  );
};
