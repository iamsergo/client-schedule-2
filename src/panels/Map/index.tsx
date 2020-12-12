import React from 'react'

import { Cell, Div, Group, Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui"

import map from '../../assets/map.png'
import { useDispatch } from 'react-redux'
import { changePanel } from '../../redux/slices/navigation'
import { PROFILE_PANEL, PROFILE_STORY } from '../../constans'

interface IMapPanelProps
{
  id : string
}

const Map : React.FC<IMapPanelProps> = ({
  id,
}) => {
  const dispatch = useDispatch()
  return(
    <Panel id={id}>
      <PanelHeader
        left={
          <PanelHeaderBack
            onClick={() => dispatch(changePanel({story : PROFILE_STORY, panel : PROFILE_PANEL}))}
          />
        }
      >Карта</PanelHeader>

      <Div>
        <img src={map} alt="карта" style={{width:'100%'}}/>
      </Div>

      <Div>
        <Group header="Расшифровка аббревиатур">
          <Cell>УК - учебный корпус</Cell>
          <Cell>ГУК - главный учебный корпус</Cell>
          <Cell>СДК - студенческий дворец культуры</Cell>
          <Cell>УСК - учебно-спортивный комплекс</Cell>
        </Group>
      </Div>
    </Panel>
  )
}

export default Map