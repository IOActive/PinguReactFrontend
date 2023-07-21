import React from 'react';
import {Link} from 'react-router-dom';

import Icon from '../Icon/Icon';
import LinksGroup from './LinksGroup/LinksGroup';

import s from './Sidebar.module.scss';

function Sidebar() {

  return (

    <nav className={s.root}>
      <header className={s.logo}>
        <Link to="/app/dashboard">
          <Icon glyph="logo2" />
        </Link>
      </header>
      <ul className={s.nav}>
        <LinksGroup
          header="Dashboard"
          headerLink="/app/dashboard"
          glyph="dashboard" />
        <LinksGroup
          header="Bots"
          headerLink="/app/bots"
          childrenLinks={[
            {
              name: 'Bot List',
              link: '/app/bots/list',
            },
            {
              name: 'Bot Create',
              link: '/app/bot/add',
            }
          ]}
          glyph="robot" />
      </ul>
    </nav>
  );
}

export default Sidebar;
