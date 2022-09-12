<template>
  <section class="home animate">
    <div
      class="scrolling-words-container"
      @mouseover="showSubtitle"
      @mouseleave="hideSubtitle"
    >
      <div class="scrolling-words-box">
        <ul>
          <li style="color: #8099e9">SPA for</li>
          <li style="color: #e99dcb">Find</li>
          <li style="color: #9d97cc">Create</li>
          <li style="color: #5f4fe3">Edit</li>
          <li style="color: #fecc00">Delete</li>
        </ul>
      </div>
      <span style="color: white">products</span>
    </div>
    <img
      id="cursor-image"
      src="@/assets/images/hover-cursor.png"
      alt="Hover cursor image"
    />
    <h2 class="home-subtitle">Single Page Application на Vue.2x.</h2>
    <h3 class="home-subtitle">
      Тестовое задание на вакансию Frontend Engineer.
    </h3>
    <h3 class="home-subtitle">
      Мне было дико интересно делать это ТЗ. Поэтому я не мог не
      поэкспереминтировать, и попытаться впечетлить вас.
    </h3>
  </section>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    showSubtitle() {
      const subtitlesList = document.getElementsByClassName("home-subtitle");
      const cursor = document.getElementById("cursor-image");
      cursor.classList.add("hide");
      Array.from(subtitlesList).forEach((subtitle, index) => {
        setTimeout(() => {
          subtitle.classList.add("show");
        }, index * 500);
      });
    },
    hideSubtitle() {
      const subtitlesList = document.getElementsByClassName("home-subtitle");
      Array.from(subtitlesList).forEach((subtitle, index) => {
        setTimeout(() => {
          subtitle.classList.remove("show");
        }, index * 500);
      });
      const cursor = document.getElementById("cursor-image");
      cursor.classList.remove("hide");
    },
  },
};
</script>
