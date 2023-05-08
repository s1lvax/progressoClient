"use client";
import useSWR from "swr";
import {
  Card,
  Title,
  Text,
  ColGrid,
  Col,
  Block,
  Button,
  AreaChart,
  Flex,
  Metric,
  BadgeDelta
} from "@tremor/react";
import Navbar from "./navbar";

interface ChartProps {
  id: string | string[] | undefined;
}

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Chart({ id }: ChartProps) {
  const { data, error } = useSWR(
    "http://localhost:3001/getStats/6457e643c83cf755ff60e395",
    fetcher
  );

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  console.log(data);

  const weightChart = [];
  const bodyfatChart = [];

  for (let i = 0; i < data.weight.length; i++) {
    weightChart.push({ weight: data.weight[i], date: data.dates[i] });
    bodyfatChart.push({ bodyfat: data.bodyfat[i], date: data.dates[i] });
  }

  return (
    <main>
      <Navbar />
      <ColGrid numColsLg={6} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
        {/* Main section */}
        <Col numColSpanLg={4}>
          <Card hFull={true} decoration="bottom">
            <Title>Weight</Title>
            <Text>Weight chart.</Text>
            <AreaChart
              data={weightChart}
              categories={["weight"]}
              dataKey="date"
              colors={["blue"]}
              // valueFormatter={valueFormatter}
              height="h-96"
            />
          </Card>
        </Col>

        {/* KPI sidebar */}
        <Col numColSpanLg={2}>
          <Block spaceY="space-y-6">
            <Card>
              <Title>Bodyfat</Title>
              <Text>Bodyfat</Text>
              <AreaChart
                data={bodyfatChart}
                categories={["bodyfat"]}
                dataKey="date"
                colors={["yellow"]}
                // valueFormatter={valueFormatter}
                height="h-48"
              />
            </Card>
            <Card>
              <Text >Stats</Text>
              <Flex
                justifyContent="justify-start"
                alignItems="items-baseline"
                truncate
                spaceX="space-x-3"
              >
                <Metric>{weightChart[weightChart.length - 1].weight} kg</Metric>
                <Text truncate>from {weightChart[weightChart.length - 2].weight} kg</Text>
              </Flex>
              <Flex justifyContent="justify-start" marginTop="mt-10" spaceX="space-x-2">
                <BadgeDelta deltaType="moderateIncrease" />
                <Flex justifyContent="justify-start" truncate spaceX="space-x-1">
                  <Text color="green">x%</Text>
                  <Text truncate> to previous month </Text>
                </Flex>
              </Flex>
            </Card>
          </Block>
        </Col>
      </ColGrid>
    </main>
  );
}
