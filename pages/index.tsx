import useSWR from "swr";
import { useState, useCallback } from "react";

import Image from "next/image";

import { Banner, Button, Cell, Div, Epic, Flex, Footnote, Group, Panel, PanelHeader, Placeholder, PullToRefresh, SplitCol, SplitLayout, Tabbar, TabbarItem, View, useAdaptivityConditionalRender } from "@vkontakte/vkui";
import { Icon24AddCircle, Icon28MessageOutline, Icon28NewsfeedOutline, Icon28ServicesOutline, Icon32LogoVkColor, Icon56NewsfeedOutline } from "@vkontakte/icons";

import { Product } from "@/pages/types/products";
import { Shop } from "@/pages/types/shop";

type APIResponse = {
  success: boolean
  response: []
}

const fetcher = (apiMethod: string) =>
  fetch(`/api/${apiMethod}`, {
    method: "GET"
  })
    .then((res) => res.json())
    .then((json) => json.data);

const ProductsContainer = ({ products, ...props }: { products: Product[] }) => {
  return (
    <Flex {...props}>
      {products.map((item, index) => {
        return (
          <Banner
            key={index}
            before={
              <Image
                width={96}
                height={96}
                src={item.image}
                alt="Иконка товара"
              />
            }
            header={item.name}
            subheader={`${item.price} ₽`}
            actions={
              <Button before={<Icon24AddCircle />} onClick={(e: any) => { console.log(e) }}>
                Добавить
              </Button>
            }
          />
        );
      })}
    </Flex>
  );
};

export default function Page () {
  const { data, error, isLoading } = useSWR(
    "products",
    fetcher
  );

  if (isLoading) return "Loading";
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>No data</div>;

  const { response }: { response: Product[] } = data;

  const activeStoryStyles = {
    backgroundColor: 'var(--vkui--color_background_secondary)',
    borderRadius: 8,
  };

  const { viewWidth } = useAdaptivityConditionalRender();
  const [activeStory, setActiveStory] = useState('home');

  const onStoryChange = (e: any) => setActiveStory(e.currentTarget.dataset.story);

  const [products, setProducts] = useState(response);
  const [fetching, setFetching] = useState(false);

  const onRefresh = useCallback(() => {
    setFetching(true);

    setTimeout(
      () => {
        setFetching(false);
        setProducts(response);
      },
      1000
    );
  }, []);

  return (
    <SplitLayout header={<PanelHeader delimiter="none" />} center>
      {viewWidth.tabletPlus && (
        <SplitCol className={viewWidth.tabletPlus.className} fixed width={280} maxWidth={280}>
          <Panel>
            <PanelHeader />
            <Group>
              <Cell
                disabled={activeStory === 'home'}
                style={activeStory === 'home' ? activeStoryStyles : undefined}
                data-story="home"
                onClick={onStoryChange}
                before={<Icon28NewsfeedOutline />}
              >
                Главная
              </Cell>
              <Cell
                disabled={activeStory === 'donate'}
                style={activeStory === 'donate' ? activeStoryStyles : undefined}
                data-story="donate"
                onClick={onStoryChange}
                before={<Icon28ServicesOutline />}
              >
                Донат
              </Cell>
              <Cell
                disabled={activeStory === 'contacts'}
                style={activeStory === 'contacts' ? activeStoryStyles : undefined}
                data-story="contacts"
                onClick={onStoryChange}
                before={<Icon28MessageOutline />}
              >
                Контакты
              </Cell>
            </Group>
            <Div className="!pt-0">
              <Flex direction="row" gap="xs" margin="auto" justify="center" align="center">
                <Footnote caps inline weight="3" className="opacity-70">Спасибо</Footnote>
                <Icon32LogoVkColor />
              </Flex>
            </Div>
          </Panel>
        </SplitCol>
      )}

      <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
        <Epic
          activeStory={activeStory}
          tabbar={
            viewWidth.tabletMinus && (
              <Tabbar className={viewWidth.tabletMinus.className}>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'home'}
                  data-story="home"
                  text="Главная"
                >
                  <Icon28NewsfeedOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'donate'}
                  data-story="donate"
                  text="Донат"
                >
                  <Icon28ServicesOutline />
                </TabbarItem>
                <TabbarItem
                  onClick={onStoryChange}
                  selected={activeStory === 'contacts'}
                  data-story="contacts"
                  text="Контакты"
                >
                  <Icon28MessageOutline />
                </TabbarItem>
              </Tabbar>
            )
          }
        >
          <View id="home" activePanel="home">
            <Panel id="home">
              <PanelHeader>Главная</PanelHeader>
              <Group style={{ minHeight: '400px' }}>
                <Placeholder icon={<Icon56NewsfeedOutline width={56} height={56} />} />
              </Group>
            </Panel>
          </View>
          <View id="donate" activePanel="donate">
            <Panel id="donate">
              <PanelHeader>Донат</PanelHeader>
              <PullToRefresh onRefresh={onRefresh} isFetching={fetching}>
                <Flex reverse justify="end" margin="auto" noWrap>
                  <Flex.Item flex="content" alignSelf="center" flexBasis={100}>
                    <ProductsContainer
                      products={products}
                      gap="l"
                      justify="center"
                      margin="auto"
                    />
                  </Flex.Item>
                </Flex>
              </PullToRefresh>
            </Panel>
          </View>
          <View id="contacts" activePanel="contacts">
            <Panel id="contacts">
              <PanelHeader>Контакты</PanelHeader>
              <Group style={{ minHeight: '400px' }}>
                <Placeholder icon={<Icon28MessageOutline width={56} height={56} />}></Placeholder>
              </Group>
            </Panel>
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
}
