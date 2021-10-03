<template>
  <v-app v-if="!iframe" style="background: #1f2223">
    <v-snackbar
      :timeout="300000"
      :color="color"
      v-model="snackbar"
    ></v-snackbar>
    <v-container class="ma-auto text-center pb-12" style="max-width: 1000px">
      <div v-if="state === 1" style="margin: 5vh auto">
        <div v-for="(question, index) in quiz.questions" v-bind:key="index">
          <div>
            <v-card class="mt-6 mb-1 px-2" style="border-radius: 10px 10px 0 0">
              <div class="d-flex" style="width: 100; min-height: 96px">
                <div
                  style="height: 100%"
                  class="d-flex flex-row flex-grow-1 justify-space-around my-auto"
                >
                  <img
                    v-if="
                      GetTitle(question).media &&
                      GetTitle(question).media.length > 0 &&
                      GetTitle(question).media[0].type === `image`
                    "
                    :src="GetTitle(question).media[0].url"
                    :alt="GetTitle(question).text"
                    class="my-2"
                    style="max-height: 192px"
                  />
                  <iframe
                    v-if="
                      GetTitle(question).media &&
                      GetTitle(question).media.length > 0 &&
                      GetTitle(question).media[0].type === `embed`
                    "
                    :src="GetTitle(question).media[0].url"
                    frameborder="0"
                    class="my-2"
                    style="max-height: 192px"
                  ></iframe>
                  <span
                    v-if="
                      GetTitle(question).hasMath &&
                      GetTitle(question).text !== ``
                    "
                    class="text-h6"
                    v-html="GetMath(GetTitle(question))"
                  >
                  </span>
                  <span
                    v-else-if="GetTitle(question).text !== ``"
                    class="text-h6 my-auto mx-1 mx-2"
                    v-html="GetTitle(question).text"
                  >
                  </span>
                </div>
              </div>
            </v-card>
            <v-card class="mb-6 mt-1 px-2" style="border-radius: 10px 10px 0 0">
              <div class="d-flex" style="width: 100; min-height: 96px">
                <div
                  v-if="
                    question.type !== `TITLE_BULLETS` &&
                    question.type !== `TITLE_BULLETS_MEDIA` &&
                    question.type !== `MSQ` &&
                    question.type !== `BLANK`
                  "
                  style="height: 100%"
                  class="d-flex flex-column flex-grow-1 ma-auto"
                >
                  <img
                    v-if="
                      GetAnswer(question).media &&
                      GetAnswer(question).media.length > 0
                    "
                    :src="GetAnswer(question).media[0].url"
                    :alt="GetAnswer(question).text"
                    class="mx-auto my-2"
                    style="max-height: 192px"
                  />
                  <span
                    v-if="GetAnswer(question).hasMath"
                    class="text-h6"
                    v-html="GetMath(GetAnswer(question))"
                  >
                  </span>
                  <span
                    v-else
                    class="text-h6"
                    v-html="GetAnswer(question).text"
                  >
                  </span>
                </div>
                <div
                  v-else
                  style="height: 100%"
                  class="d-flex flex-column flex-grow-1 my-auto"
                >
                  <ul class="d-flex justify-space-around">
                    <li
                      class="text-left"
                      v-for="(answer, index) in GetAnswer(question)"
                      v-bind:key="index"
                    >
                      <img
                        v-if="answer.media && answer.media.length > 0"
                        :src="answer.media[0].url"
                        :alt="answer.text"
                        class="mx-auto my-2"
                        style="max-height: 192px"
                      />
                      <span
                        v-if="answer.hasMath"
                        class="text-h6 my-auto mx-1"
                        v-html="`${GetMath(answer)},`"
                      >
                      </span>
                      <span
                        v-else
                        class="text-h6 my-auto mx-1"
                        v-html="answer.text"
                      >
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </v-card>
          </div>
        </div>
        <v-btn class="mt-6" color="primary" @click="Reset">Reset</v-btn>
      </div>
      <v-row v-if="state === 0">
        <v-col class="mt-16">
          <v-row>
            <v-col>
              <v-text-field
                v-model="gamePin"
                :rules="numberRules"
                @keyup.enter="GetAnswersFromPin(gamePin)"
                autocomplete="off"
                label="Game pin"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-btn
              class="text-center mx-auto"
              color="primary"
              large
              :loading="loading"
              @click="GetAnswersFromPin(gamePin)"
              >Get Answers</v-btn
            >
          </v-row>
        </v-col>
      </v-row>
      <div class="ad mx-auto mt-16 d-flex">
        <div id="kahoot-rocks_728x90" class="mb-16">
          <script type="application/javascript">
            aiptag.cmd.display.push(function () {
              aipDisplayTag.display("kahoot-rocks_728x90");
            });
          </script>
        </div>

        <div id="kahoot-rocks_300x250">
          <script type="application/javascript">
            aiptag.cmd.display.push(function () {
              aipDisplayTag.display("kahoot-rocks_300x250");
            });
          </script>
        </div>
      </div>
    </v-container>
    <v-footer app class="d-flex flex-row text-center">
      <div class="mx-auto">
        <span>&copy; {{ new Date().getFullYear() }} Quizizz Rocks</span>
        <span class="px-1">|</span>
        <span>v5.0.0</span>
        <span class="px-1">|</span>
        <span
          ><a href="https://rocks.network/discord" style="color: #8563a6"
            >Discord Server</a
          ></span
        >
        <span v-if="quiz.quizId" class="px-1">|</span>
        <span v-if="quiz.quizId">QuizID: {{ quiz.quizId }}</span>
      </div>
    </v-footer>
  </v-app>
  <v-app v-else>
    <div class="text-center d-flex" style="height: 100vh">
      <span class="ma-auto"
        >This is an unnoficial version of quizizz.rocks. Please use the official
        version at https://quizizz.rocks</span
      >
    </div>
  </v-app>
</template>

<script>
/* eslint-disable no-undef */

export default {
  name: "App",
  data() {
    return {
      quiz: {},
      search: "",
      gamePin: "",
      numberRules: [
        (value) => {
          const regex = /^(https:\/\/quizizz\.com\/join\?gc=)?[0-9 -]+$/gm;
          return (
            regex.test(value) ||
            (value == "" || value == null ? true : "Has to be a number")
          );
        },
      ],
      loading: false,
      state: 0,
      notification: {
        text: "",
        type: "",
        active: false,
      },
    };
  },
  computed: {
    iframe() {
      return window.self !== window.top;
    },
    snackbar: {
      get() {
        return this.notification.active;
      },
      set(value) {
        this.notification.active = value;
      },
    },
    color() {
      switch (this.notification.type) {
        case "ERROR":
          return "red";
        case "WARN":
          return "#FFC71E";
        default:
          return "green";
      }
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    GetTitle(question) {
      switch (question.type) {
        case "EMBED_WEBPAGE":
        case "MEDIA_SUBTITLE":
          return { text: "", media: question.structure.media };
        case "TITLE_PARA":
        case "TITLE_PARA_MEDIA":
        case "TITLE_BULLETS":
        case "TITLE_BULLETS_MEDIA":
        case "TITLE_SUBTITLE":
          return question.structure.title;
        case "MCQ":
          if (question.structure.answer === -1) return { text: "Unranked" };
          return question.structure.query;
        case "MSQ":
        case "BLANK":
          return question.structure.query;
        case "OPEN":
          return { text: "Unranked" };
        default:
          return {
            text: `Dm Joder#0006 with <code>${this.quiz.quizId} ${question.type} unsupported</code>`,
          };
      }
    },
    GetAnswer(question) {
      switch (question.type) {
        case "EMBED_WEBPAGE":
        case "TITLE_SUBTITLE":
        case "MEDIA_SUBTITLE":
          return question.structure.subtitle;
        case "TITLE_PARA":
        case "TITLE_PARA_MEDIA":
          return question.structure.para;
        case "TITLE_BULLETS":
        case "TITLE_BULLETS_MEDIA":
          return question.structure.bullets;
        case "MSQ":
          return question.structure.answer.map(
            (i) => question.structure.options[i]
          );
        case "MCQ":
          if (question.structure.answer === -1) return { text: "Unranked" };
          return question.structure.options[question.structure.answer];
        case "BLANK":
          return question.structure.options;
        case "OPEN":
          return { text: "Unranked" };
        default:
          return {
            text: `Dm Joder#0006 with <code>${this.quiz.quizId} ${question.type} unsupported</code>`,
          };
      }
    },
    GetMath(question) {
      return question.text.replace(/<br\/?>/g, "");
    },
    Reset() {
      this.state = 0;
      this.quiz = {};
      this.gamePin = "";
      this.loading = false;
      this.notification = {
        text: "",
        type: "",
        active: false,
      };

      const origin = location.origin;
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("pin")) window.location.replace(origin);
    },
    Notify(text, type) {
      this.loading = false;
      this.notification.text = text;
      this.notification.type = type;
      this.notification.active = true;
      setTimeout(
        (document.querySelector(
          ".v-snack__content"
        ).innerHTML = this.notification.text),
        1
      );
    },
    async GetAnswersFromPin(pin) {
      this.loading = true;
      try {
        const gamePin = pin.replace(/( |-)/g, "");
        console.log(gamePin);
        if (isNaN(Number(gamePin))) return (this.loading = false);
        this.quiz = await fetch(
          `https://abstract.land/quizizz/?pin=${gamePin}`
        ).then((res) => res.json());
        switch (this.quiz.code) {
          case "JSON_PARSE_FAILED":
            return this.GetAnswersFromPin(pin);
          case "PRIVATE_QUIZ":
            throw new Error(`Shared private quizzes no longer work`);
          default:
            if (this.quiz.code) throw new Error(this.quiz.message);
            break;
        }
        this.state = 1;
      } catch (e) {
        this.Notify(e, "ERROR");
      }
      this.loading = false;
    },
    CheckForAdblock() {
      fetch(
        " https://api.adinplay.com/libs/aiptag/pub/KHR/kahoot.rocks/tag.min.js"
      ).catch(() => {
        console.log("Adblock detected");
        const el = document.querySelector(".ad");
        el.style[
          "background-image"
        ] = `url("https://quizizz.rocks/adblock728.png")`;
        el.style["background-repeat"] = "no-repeat";
        el.style["background-position"] = "center";
      });
    },
  },
  watch: {
    loading() {
      if (this.loading == true)
        document.title = "Quizizz.Rocks - Loading Answers...";
      if (!this.loading && this.quiz.quizId)
        document.title = "Quizizz.Rocks - Got Answers :)";
    },
  },
  mounted() {
    this.CheckForAdblock();
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("pin") && !isNaN(Number(urlParams.get("pin"))))
      this.GetAnswersFromPin(urlParams.get("pin"));
  },
};
</script>

<style>
#kahoot-rocks_728x90,
#kahoot-rocks_300x250 {
  margin: auto;
}
@media only screen and (max-width: 850px) {
  .ad {
    min-height: 250px;
  }

  #kahoot-rocks_300x250 {
    display: unset;
  }
  #kahoot-rocks_728x90 {
    display: none;
  }
}
@media only screen and (min-width: 850px) {
  .ad {
    min-height: 90px;
  }

  #kahoot-rocks_300x250 {
    display: none;
  }
  #kahoot-rocks_728x90 {
    display: unset;
  }
}

*::-webkit-scrollbar {
  display: none;
}

* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.v-snack .v-snack__wrapper,
.v-footer {
  background-color: #181a1b !important;
}

.v-snack a {
  color: #8563a6 !important;
}

div.v-card__actions {
  padding: 0 0 16px 16px;
}

li {
  list-style-type: none;
}
</style>
