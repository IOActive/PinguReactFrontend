/* Copyright 2024 IOActive

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import React from 'react';
import { Link } from 'react-router-dom';

import Icon from 'components/Icon/Icon';
import LinksGroup from './LinksGroup/LinksGroup';


import s from './Sidebar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonDigging,
  faRocket,
  faBoxArchive,
  faRobot,
  faDragon,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import { use } from 'react';



function Sidebar() {

  const active_project = useSelector((state) => state.active_project);

  return (

    <nav className={s.root}>
      <header className={s.logo}>
        <Link to="/dashboard">
          <Icon glyph="pingucrew" />
        </Link>
      </header>
      <ul className={s.nav}>
        <LinksGroup
          header="Dashboard"
          headerLink="/dashboard"
          glyph="dashboard" />

        <LinksGroup
          header="Projects"
          headerLink="/project"
          childrenLinks={[
            {
              name: 'Project List',
              link: '/project/list',
            },
            {
              name: 'Project Create',
              link: '/project/add',
            }
          ]}
          glyph={<FontAwesomeIcon icon={faDragon} />} />

        <LinksGroup
          header="Bots"
          headerLink="/bots"
          childrenLinks={[
            {
              name: 'Bot List',
              link: '/bot/list',
            },
            {
              name: 'Bot Create',
              link: '/bot/add',
            }
          ]}
          glyph={<FontAwesomeIcon icon={faRobot} />} />

        {active_project ? (
          <LinksGroup
            header="Jobs"
            headerLink="/jobs"
            childrenLinks={[
              {
                name: 'Job List',
                link: '/job/list',
              },
              {
                name: 'Job Create',
                link: '/job/add',
              }
            ]}
            glyph={<FontAwesomeIcon icon={faPersonDigging} />} />
        ) : null
        }
        <LinksGroup
          header="Fuzzers"
          headerLink="/fuzzers"
          childrenLinks={[
            {
              name: 'Fuzzers List',
              link: '/fuzzer/list',
            },
            {
              name: 'Fuzzer Create',
              link: '/fuzzer/add',
            }
          ]}
          glyph={<FontAwesomeIcon icon={faRocket} />} />

        {
          active_project ? (
            <><LinksGroup
              header="Build Manger"
              headerLink="/build_manager"
              childrenLinks={[
                {
                  name: 'Build  List',
                  link: '/build_manager/list',
                },
                {
                  name: 'Build Create',
                  link: '/build_manager/add',
                }
              ]}
              glyph={<FontAwesomeIcon icon={faBoxArchive} />} /><LinksGroup
                header="Coverage Explorer"
                headerLink="/coverage"
                childrenLinks={[
                  {
                    name: 'Project Coverage',
                    link: '/coverage/explorer',
                  }
                ]}
                glyph={<FontAwesomeIcon icon={faCode} />} /></>
          ) : null
        }
      </ul>
    </nav>
  );
}

export default Sidebar;
