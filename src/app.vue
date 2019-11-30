<template>
  <div id="app">
    <div class="container">
      <section>
        <h1>
          <a href="https://nodevember.io/">#Nodevember</a> 2019
        </h1>
        <h4>
          30 procedural materials by
          <a href="https://twitter.com/chiu_hans" target="blank">Hans Chiu</a>
        </h4>
        <a href="https://twitter.com/hashtag/nodevember" target="blank">#nodevember</a>
        <a href="https://twitter.com/hashtag/nodevember2019" target="blank">#nodevember2019</a>
        <a href="https://twitter.com/hashtag/b3d" target="blank">#b3d</a>

        <div class="row">
          <div class="col" v-for="(row,i) in rows" :key="i">
            <div class="title">
              <h6>{{catagorys[i]}}</h6>
            </div>
            <div
              class="item"
              :style="{
                  backgroundImage: `url(./assets/${item.img})`
              }"
              v-for="(item,j) in row"
              :key="j"
            >
              <div class="info">
                <div class="no">{{item.id}}</div>
                <div class="hidden">{{item.name}}</div>
              </div>
              <a target="blank" :href="'https://twitter.com/chiu_hans/status/'+item.post">
                <img class="top" :src="'./assets/'+item.gif" alt />
                <img src="./assets/1x1.png" style="opacity:0" alt />
              </a>
            </div>
          </div>
        </div>
      </section>
      <br />
      <section>
        <h3>What is this?</h3>
        <h5>Everything you see here are all generated using Blender3D shader nodes!</h5>
        <hr />

        <p>
          <a target="blank" href="https://twitter.com/nodevemberio">@NodevemberIO</a>
          is a event Organized by
          <a
            target="blank"
            href="https://twitter.com/JonasDichelle"
          >@JonasDichelle</a>
          and
          <a target="blank" href="https://twitter.com/LucaRood">@LucaRood</a>
          , official website:
          <a target="blank" href="https://nodevember.io/">nodevember.io</a>
        </p>
        <p>In November 2019, we make a procedural material inspired by the prompt given by #nodevember for each day, without using any image textures, modelling or sculpting.</p>
        <p>That means everything will need to be done in the "Nodes", which is a way to build procedural material visually, and the main software used is Blender3D. (also many Substance Designer participants)</p>
        <br />
        <h3>Techniques</h3>
        <hr />
        <ul>
          <li>
            <div class="row reverse">
              <img class="ml mt" width="140" src="./assets/19.jpg" alt />
              <div>
                <h5>2D Procedural texture</h5>
                <p>the most simple way to create procedural texture, you basically generate a 2D image by combining different procedural texture, like Voronoi, noise texture... carefully manipulates 2D coordinates and choosing the best color to shade them.</p>
              </div>
            </div>
          </li>

          <li>
            <div class="row reverse">
              <img class="ml mt" width="140" src="./assets/08.jpg" alt />
              <div>
                <h5>3D Displacement/Vector Displacement.</h5>
                <p>this is where the most magic happens, in Blender3D cycles renderer, you can plug vector information into the displacement socket, then the actual vertices being rendered will be displaced by that vector.</p>
                <p>the hard part is that vector information also needs to be procedural, so it takes a lot of effort just to get a shape right.</p>
              </div>
            </div>
          </li>

          <li>
            <div class="row reverse">
              <img class="ml mt" width="140" src="./assets/24.jpg" alt />
              <div>
                <h5>Procedural volumetric shader</h5>
                <p>creating shape by plugin a procedural density value to the volumetric shader, so in the 3D space, at any position, the color, scattering, and emission are all under your control.</p>
                <p>downsides are volumetric takes a lot of time to render, and because everything is under control, that also means you need to control everything procedurally. BUT by using this, with new EEVEE volumetric rendering, you can even create a nebula!</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <footer>
        <br />
        <h3>Who design this website?</h3>
        <h5>me :)</h5>
        <hr />
        <p>I am too lazy to layout all 30 images one by one...</p>
        <p>
          Github:
          <a
            href="https://github.com/chiuhans111/Nodevember2019"
          >github.com/chiuhans111/Nodevember2019</a>
        </p>
      </footer>
    </div>
    <br />
  </div>
</template>

<script>
import works from "./js/works.json";

let works_arr = [];

for (var i in works) {
  works[i].id = i;
  works[i].name = works[i].name
    .split("_")
    .map(x => {
      return x.slice(0, 1).toUpperCase() + x.slice(1);
    })
    .join(" ");
  works_arr.push(works[i]);
}

works_arr.sort((a, b) => a.id - b.id);

export default {
  name: "app",
  data() {
    return {
      catagorys: [
        "Natural Phenomena",
        "Nature",
        "Craft",
        "Technology",
        "Space",
        "Various"
      ],
      rows: [
        works_arr.slice(1, 6),
        works_arr.slice(6, 11),
        works_arr.slice(11, 16),
        works_arr.slice(16, 21),
        works_arr.slice(21, 26),
        works_arr.slice(26, 31)
      ]
    };
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.row {
  width: 100%;
  display: flex;
  align-items: flex-start;
  position: relative;

  @media screen and (max-width: 500px) {
    flex-wrap: wrap;
    &.reverse {
      img {
        width: 100%;
      }
    }
  }

  &.reverse {
    flex-direction: row-reverse;
  }

  .col {
    .title {
      height: 64px;
      padding: 0px 0px 16px;
      h6 {
        position: relative;
        top: 50%;
        transform: translate(0, -50%);
      }
    }
    text-align: center;
    flex-shrink: 0;
    width: 16.6667%;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    .item {
      position: relative;
      width: 100%;
      background-size: cover;
      background-position: center;

      .info {
        text-align: left;
        position: absolute;
        color: white;
        width: 100%;
        height: 100%;
        .no {
          position: absolute;
          left: 0px;
          bottom: 0px;
          padding: 4px;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .hidden {
          color: black;
          text-align: center;
          padding: 6px;
          margin: 0px -2px;
          position: absolute;

          background: white;
          bottom: 0px;
          transform: translate(0, 100%);
          opacity: 0;
        }
      }

      img {
        width: 100%;
      }
      .top{
        position: absolute;
        width: 100%;
        height: 100%;
      }
      &:hover {
        border: solid 2px white;
        box-shadow: 0 19px 38px rgba(0, 0, 0, 0.5),
          0 15px 12px rgba(0, 0, 0, 0.22);
        z-index: 2;
        transform: scale(1.1);
        .info .hidden {
          opacity: 1;
        }
      }
      transition: transform 0.1s;
    }
  }
}
</style>