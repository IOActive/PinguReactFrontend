import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../Icon/Icon';
import LinksGroup from './LinksGroup/LinksGroup';


import s from './Sidebar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonDigging,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";


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
              link: '/app/bot/list',
            },
            {
              name: 'Bot Create',
              link: '/app/bot/add',
            }
          ]}
          glyph="robot" />

        <LinksGroup
          header="Jobs"
          headerLink="/app/jobs"
          childrenLinks={[
            {
              name: 'Job List',
              link: '/app/job/list',
            },
            {
              name: 'Job Create',
              link: '/app/job/add',
            }
          ]}
          glyph={<FontAwesomeIcon icon={faPersonDigging} />} />

        <LinksGroup
          header="Fuzzers"
          headerLink="/app/fuzzers"
          childrenLinks={[
            {
              name: 'Fuzzers List',
              link: '/app/fuzzer/list',
            },
            {
              name: 'Fuzzer Create',
              link: '/app/fuzzer/add',
            }
          ]}
          glyph={<FontAwesomeIcon icon={faRocket} />} />
      </ul>
    </nav>
  );
}

export default Sidebar;
