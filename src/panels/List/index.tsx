import React from 'react'
import './List.sass'

import { Button, Div, FixedLayout, List, Panel, PanelHeader, PanelHeaderButton, PanelSpinner, Placeholder, SimpleCell, Tabs, TabsItem } from '@vkontakte/vkui'
import Icon28ShareOutline from '@vkontakte/icons/dist/28/share_outline';
import bridge from '@vkontakte/vk-bridge'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { requestList } from '../../redux/slices/list';

interface ListPanelProps
{
  id : string
}

const ListPanel : React.FC<ListPanelProps> = ({
  id,
}) => {
  const dispatch = useDispatch()
  const { loadingList, errorList, list } = useSelector((s : RootState) => s.list)

  const [activeTab, setActiveTab] = React.useState<'instituts'|'groups'>('groups')

  const share = () => {
    bridge.send('VKWebAppShare')
      .then(res=>res)
      .catch(err=>err)
  }

  React.useEffect(() => {
    if(!list) dispatch(requestList())
  },[])

  return (
    <Panel id={id}>
      <PanelHeader
        separator={false}
        left={
          <PanelHeaderButton
            onClick={share}
          ><Icon28ShareOutline/></PanelHeaderButton>
        }
      >Список</PanelHeader>
      <FixedLayout style={{width:'100%'}}>
        <Tabs>
          <TabsItem
            selected={activeTab === 'groups'}
            onClick={() => setActiveTab('groups')}
          >Группы</TabsItem>
          <TabsItem
            selected={activeTab === 'instituts'}
            onClick={() => setActiveTab('instituts')}
          >Институты</TabsItem>
        </Tabs>
      </FixedLayout>

      {loadingList && <div style={{marginTop:60}}><PanelSpinner/></div>}
      {errorList &&
        <Placeholder
         style={{marginTop:52}}
          action={
            <Button
              mode="tertiary"
              onClick={() => dispatch(requestList())}
            >Попробовать еще</Button>
          }
          stretched
        >Произошла ошибка</Placeholder>
      }
      {list &&
        <List style={{marginTop:52}}>
          {Object.entries(list[activeTab]).map((entrie,i) => {
            const [key, count] = entrie

            let cn = ''
            if(i < 5) cn = `place-${i+1}`

            return <SimpleCell
              key={i}
              disabled
              before={<b className={cn}>{`${i+1}`}</b>}
              after={count as number}
            >{key}</SimpleCell>
          })}
        </List>
      }
    </Panel>
  )
}

export default ListPanel