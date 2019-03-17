import React, { Component } from "react";

const { floor, random } = Math;
const getRandomFloat = (min, max) => random() * (max - min) + min;
const getRandomInt = (min, max) => floor(random() * (max - min + 1) + min);
const getRandomSeed = () => getRandomInt(0, 1000);

const Circles = ({ colors, size = 500, seed = "12345" }) => {
  const jitterId1 = `jitter-1-${seed}`;
  const jitterId2 = `jitter-2-${seed + 1}`;

  const mid = size / 2;
  const radius1 = getRandomInt(mid * 0.6, mid * 0.8);
  const radius2 = getRandomInt(radius1 * 0.95, radius1 * 1.05);

  return (
    <svg width={size} height={size}>
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
  state = { seed: 12345 };

  refresh = () => this.setState({ seed: getRandomSeed() });

  render() {
    return (
      <div className="container">
        <div>
          <button onClick={this.refresh}>refresh</button>
        </div>
        <div>
          <Circles colors={["#60e4d3", "#ffe83b"]} seed={this.state.seed} />
        </div>
      </div>
    );
  }
}

export default App;
