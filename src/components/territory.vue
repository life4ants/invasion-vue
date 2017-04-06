<template>
  <div class="countrybox" :id="'territory'+id">
    <div class='icon' :id="'icon'+id">
      <icon :code=icon :size="21"></icon>
    </div>
    <div :id="'label'+ id" class='T-label'>
      {{reserves}}
    </div>
  </div>
</template>

<script>
  import icon from './icon'

  export default {
    name: 'territory',
    components: {
      icon
    },
    props: [
      'id', 'icon', 'reserves'
    ]
  }
</script>

<style scoped>

.T-label
{
  user-select: none;
  /*pointer-events: none;*/
  position: absolute;
  text-align: center;
  vertical-align: middle;
  font-size: 1.0em;
  font-weight: bold;
  font-family: serif;
  color: black;
  background: rgb(244, 236, 192);
  background: rgba(244, 236, 192, 0.8);
  border-radius: 50%;
  height: 18px;
  min-width: 18px;
}
.icon
{
  position: absolute;
  top: 11px;
}

.countrybox
{
    position: absolute;
    width: 25px;
    height: 35px;
}
#territory1 { left: 160px; top: 90px; }
 #territory2 { left: 280px; top: 170px; }
 #territory3 { left: 330px; top: 400px; }
 #territory4 { left: 440px; top: 220px; }
 #territory5 { left: 440px; top: 400px; }
 #territory6 { left: 535px; top: 430px; }
 #territory7 { left: 610px; top: 240px; }
 #territory8 { left: 625px; top: 430px; }
 #territory9 { left: 760px; top: 450px; }
 #territory10 { left: 925px; top: 400px; }
 #territory11 { left: 1020px; top: 306px; }
 #territory12 { left: 1130px; top: 370px; }
 #territory13 { left: 1085px; top: 470px; }
 #territory14 { left: 1035px; top: 460px; }
 #territory15 { left: 1005px; top: 495px; }
 #territory16 { left: 990px; top: 550px; }
 #territory17 { left: 945px; top: 565px; }
 #territory18 { left: 935px; top: 620px; }
 #territory19 { left: 925px; top: 680px; }
 #territory20 { left: 885px; top: 665px; }
 #territory21 { left: 855px; top: 645px; }
 #territory22 { left: 835px; top: 695px; }
 #territory23 { left: 805px; top: 655px; }
 #territory24 { left: 815px; top: 595px; }
 #territory25 { left: 745px; top: 585px; }
 #territory26 { left: 765px; top: 665px; }
 #territory27 { left: 805px; top: 735px; }
 #territory28 { left: 935px; top: 725px; }
 #territory29 { left: 908px; top: 760px; }
 #territory30 { left: 870px; top: 790px; }
 #territory31 { left: 914px; top: 870px; }
 #territory32 { left: 815px; top: 800px; }
 #territory33 { left: 770px; top: 805px; }
 #territory34 { left: 728px; top: 840px; }
 #territory35 { left: 725px; top: 770px; }
 #territory36 { left: 715px; top: 700px; }
 #territory37 { left: 700px; top: 625px; }
 #territory38 { left: 675px; top: 565px; }
 #territory39 { left: 600px; top: 535px; }
 #territory40 { left: 600px; top: 590px; }
 #territory41 { left: 610px; top: 645px; }
 #territory42 { left: 625px; top: 700px; }
 #territory43 { left: 645px; top: 760px; }
 #territory44 { left: 620px; top: 840px; }
 #territory45 { left: 510px; top: 780px; }
 #territory46 { left: 520px; top: 690px; }
 #territory47 { left: 500px; top: 615px; }
 #territory48 { left: 475px; top: 540px; }
 #territory49 { left: 400px; top: 585px; }
 #territory50 { left: 340px; top: 510px; }
 #territory51 { left: 320px; top: 570px; }
 #territory52 { left: 310px; top: 725px; }
 #territory53 { left: 360px; top: 660px; }
 #territory54 { left: 435px; top: 680px; }
 #territory55 { left: 425px; top: 780px; }
 #territory56 { left: 342px; top: 825px; }
 #territory57 { left: 430px; top: 870px; }
 #territory58 { left: 395px; top: 945px; }
 #territory59 { left: 460px; top: 950px; }
 #territory60 { left: 495px; top: 890px; }
 #territory61 { left: 568px; top: 925px; }
 #territory62 { left: 518px; top: 965px; }
 #territory63 { left: 495px; top: 1023px; }
 #territory64 { left: 550px; top: 1005px; }
 #territory65 { left: 595px; top: 1010px; }
 #territory66 { left: 604px; top: 950px; }
 #territory67 { left: 626px; top: 988px; }
 #territory68 { left: 667px; top: 1069px; }
 #territory69 { left: 630px; top: 1070px; }
 #territory70 { left: 592px; top: 1040px; }
 #territory71 { left: 532px; top: 1058px; }
 #territory72 { left: 575px; top: 1075px; }
 #territory73 { left: 610px; top: 1105px; }
 #territory74 { left: 670px; top: 1115px; }
 #territory75 { left: 748px; top: 1123px; }
 #territory76 { left: 785px; top: 1069px; }
 #territory77 { left: 809px; top: 1030px; }
 #territory78 { left: 825px; top: 1055px; }
 #territory79 { left: 820px; top: 1097px; }
 #territory80 { left: 790px; top: 1145px; }
 #territory81 { left: 823px; top: 1168px; }
 #territory82 { left: 855px; top: 1145px; }
 #territory83 { left: 900px; top: 1180px; }
 #territory84 { left: 925px; top: 1235px; }
 #territory85 { left: 992px; top: 1265px; }
 #territory86 { left: 1045px; top: 1030px; }
 #territory87 { left: 975px; top: 977px; }
 #territory88 { left: 1045px; top: 940px; }
 #territory89 { left: 1113px; top: 1002px; }
 #territory90 { left: 1145px; top: 998px; }
</style>