<section>
  <h1>titre 1</h1>
  <div id="frame">
    <svg width="800" height="400">
      <!--ecriture des def  -->
      <defs>
      <pattern id="imgpattern" x="0" y="0" width="1" height="1">
        <image width="150" height="150"
               xlink:href="https://upload.wikimedia.org/wikipedia/commons/4/41/IMG_Mali_Roundel.svg"/>
      </pattern>
      </defs>
      <!--  -->

      <rect id="orange-circle" width="150" height='150' x="0" y="0" style="fill:url(#imgpattern)" />

      <animate
           xlink:href="#orange-circle"
           attributeName="x"
           from="50"
           to="450"
           dur="2s"
           begin="click"
           values="50; 490; 150; 450"
           keyTimes="0; 0.7; 0.8; 1"
           fill="freeze"
           id="circ-anim"/>
    </svg>

  </div>
  <?php



   ?>

</section>
