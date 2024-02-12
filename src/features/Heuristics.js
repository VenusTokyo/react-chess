'use client'

import { useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const initData = (names, balance) => {
  let data = [];

  names.forEach((item, i) => {
    if (balance[i] !== 0) {
      data.push({ name: item, val: balance[i] });
    }
  });

  data.sort((a, b) => {
    return b.val - a.val;
  });

  return data;
};

const Heuristics = () => {
  const stateNav = useSelector(state => state.nav);

  const stateHeuristics = useSelector(state => state.heuristics);

  if (
    stateNav.dialogs.settings.fields.heuristics === 'on' &&
    stateHeuristics.heuristics
  ) {
    const data = initData(
      stateHeuristics.heuristics.names,
      stateHeuristics.heuristics.balance
    );

    const offset = () => {
      const dataMax = Math.max(...data.map((i) => i.val));
      const dataMin = Math.min(...data.map((i) => i.val));
      if (dataMax <= 0) {
        return 0;
      } else if (dataMin >= 0) {
        return 1;
      }

      return dataMax / (dataMax - dataMin);
    };

    return (
      <ResponsiveContainer height="25%" width="100%">
        <AreaChart
          data={data}
          margin={{
            top: 15,
            left: 15,
            right: 15,
            bottom: 15,
          }}
        >
          <XAxis dataKey="name" hide={true} />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={offset()} stopColor="#e8e8e8" stopOpacity={1} />
              <stop offset={offset()} stopColor="#202020" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="val"
            stroke="#8884d8"
            strokeWidth={2}
            fill="url(#splitColor)"
            dot={{ stroke: "#8884d8", strokeWidth: 4, r: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return null;
}

export default Heuristics;
