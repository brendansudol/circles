import React, { Component } from "react";

const { floor, random } = Math;
const getRandomFloat = (min, max) => random() * (max - min) + min;
const getRandomInt = (min, max) => floor(random() * (max - min + 1) + min);
const getRandomSeed = () => getRandomInt(0, 1000);
const sample = arr => arr[floor(random() * arr.length)];

const WIDTH = 800;
const COLS = 3;
const ROWS = 3;

const COLORS = [
  ["#ffe54d", "#5ac8e1"],
  ["#fe7615", "#715941"],
  ["#ffb959", "#f25c9a"],
  ["#cde448", "#49dac6"],
  ["#962a9b", "#77e1c2"],
  ["#f1599a", "#e84c45"],
  ["#ee6627", "#5d1993"]
];

const Circles = ({ colors, size = WIDTH, seed = "12345" }) => {
  const jitterId1 = `jitter-1-${seed}`;
  const jitterId2 = `jitter-2-${seed + 1}`;

  const mid = size / 2;
  const radius1 = getRandomInt(mid * 0.6, mid * 0.8);
  const radius2 = getRandomInt(radius1 * 0.95, radius1 * 1.05);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <filter id="texture-cloudy">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".01"
            numOctaves="10"
            seed={seed}
            result="feTurbulence"
          />
          <feColorMatrix
            values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -0.6 1.25"
            in="feTurbulence"
            result="feColorMatrix"
          />
          <feComposite in="SourceGraphic" in2="feColorMatrix" operator="in" />
          <feGaussianBlur stdDeviation=".25" />
        </filter>
        <filter id="texture-dots">
          <feTurbulence
            type="turbulence"
            baseFrequency=".4"
            numOctaves="10"
            seed={seed}
            result="feTurbulence"
          />
          <feColorMatrix
            values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -0.6 1.25"
            in="feTurbulence"
            result="feColorMatrix"
          />
          <feComposite in="SourceGraphic" in2="feColorMatrix" operator="in" />
        </filter>
        <filter id={jitterId1}>
          <feTurbulence
            type="turbulence"
            baseFrequency="0.005"
            numOctaves="30"
            seed={seed}
            result="feTurbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="feTurbulence"
            scale="25"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id={jitterId2}>
          <feTurbulence
            type="turbulence"
            baseFrequency="0.005"
            numOctaves="30"
            seed={seed + 1}
            result="feTurbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="feTurbulence"
            scale="25"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      <g filter="url(#texture-cloudy)">
        <g key={seed} filter="url(#texture-dots)">
          <circle
            filter={`url(#${jitterId1})`}
            cx={mid}
            cy={mid}
            r={radius1}
            fill={colors[0]}
            fillOpacity={0.9}
          />
          <circle
            filter={`url(#${jitterId2})`}
            cx={mid + getRandomInt(-mid * 0.2, mid * 0.2)}
            cy={mid + getRandomInt(-mid * 0.2, mid * 0.2)}
            r={radius2}
            fill={colors[1]}
            fillOpacity={0.9}
          />
        </g>
      </g>
    </svg>
  );
};

class App extends Component {
  state = { key: random() };

  refresh = () => this.setState({ key: random() });

  render() {
    return (
      <>
        <button className="absolute top-0 right-0 m1" onClick={this.refresh}>
          refresh
        </button>
        <div className="p2 mx-auto" style={{ maxWidth: WIDTH }}>
          <div className="flex flex-wrap">
            {[...Array(COLS * ROWS)].map((_, i) => (
              <div key={i} style={{ width: `${(1 / COLS) * 100}%` }}>
                <Circles colors={sample(COLORS)} seed={getRandomSeed()} />
              </div>
            ))}
          </div>
          <div />
        </div>
      </>
    );
  }
}

export default App;
