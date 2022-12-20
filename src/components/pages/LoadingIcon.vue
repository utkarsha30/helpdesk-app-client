<template>
	<div class="container my-4  rotate">
  <svg id="loading"  viewbox="0 0 100 80">
  <defs>
    <linearGradient id="gradient" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4383b8" />
      <stop offset="100%" stop-color="#4aa06c" />
    </linearGradient>
    <clipPath id="rects">
      <rect class="rect" id="rect1" x="0" y="0" width="30" height="30" rx="2" ry="2" />
      <rect class="rect" id="rect2" x="0" y="0" width="30" height="30" rx="2" ry="2" />
      <rect class="rect" id="rect3" x="0" y="0" width="30" height="30" rx="2" ry="2" />
      <rect class="rect" id="rect4" x="0" y="0" width="30" height="30" rx="2" ry="2" />
      <rect class="rect" id="rect5" x="0" y="0" width="30" height="30" rx="2" ry="2" />
      <rect class="rect" id="rect6" x="0" y="0" width="30" height="30" rx="2" ry="2" />
      <rect class="rect" id="rect7" x="0" y="0" width="30" height="30" rx="2" ry="2" />
    </clipPath>
  </defs>
  <!-- 
    (100 / sqrt(2 * 30^2)) == 0.707. 
    Used pythagorean principle to scale the rectangles to fit within a 100x100 viewport 
  --> 
  <rect id="container" transform="translate(50) scale(0.707, 0.707) rotate(45)" x="0" y="0" width="100" height="100" fill="url(#gradient)" clip-path="url(#rects)">
  </rect>
</svg>
</div>
</template>

<script>
export default {
    name: 'LaodingIcon'
}
</script>

<style scoped>
.rotate{
	padding:10%;
	transform:rotate(180deg);

}
@keyframes slide {
    0% {
        transform: translate(0,0);
    }
	2% {
		transform: translate(33px,0);
	}
	12.5% {
		transform: translate(33px,0);
	}
	15.5% {
		transform: translate(66px,0);
	}
	25% {
		transform: translate(66px,0);
	}
	27% {
		transform: translate(66px,33px);
	}
	37.5% {
		transform: translate(66px,33px);
	}
	39.5% {
		transform: translate(33px,33px);
	}
	50% {
		transform: translate(33px,33px);
	}
	52% {
		transform: translate(33px,66px);
	}
	62.5% {
		transform: translate(33px,66px);
	}
	64.5% {
		transform: translate(0,66px);
	}
	75% {
		transform: translate(0,66px);
	}
	77% {
		transform: translate(0,33px);
	}
	87.5% {
		transform: translate(0,33px);
	}
	89.5% {
		transform: translate(0,0);
	}
	100% {
		transform: translate(0,0);
	}
}
@keyframes gradient1 {
	from {
		stop-color: #4383b8;
	}
	50% {
		stop-color: #8013b9;
	}
	to{
		stop-color: #4383b8;
	}
}
 @keyframes gradient2 {
	from {
		stop-color: #4aa06c;
	}
	50% {
		stop-color: #b22358;
	}
	to {
		stop-color: #4aa06c;
	}
}
 @keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
 svg#loading {
	margin-left: 45%;
	width: 20rem;
	height: auto;
}
 svg#loading #gradient > stop[offset="0%"] {
	animation: gradient1 15s ease 0s infinite;
}
 svg#loading #gradient > stop[offset="100%"] {
	animation: gradient2 15s ease 0s infinite;
}
 svg#loading .rect {
	animation: slide 15s ease infinite;
}
 svg#loading #rect1 {
	animation-delay: 0s;
}
 svg#loading #rect2 {
	animation-delay: -2.1428571428571s;
}
 svg#loading #rect3 {
	animation-delay: -4.2857142857143s;
}
 svg#loading #rect4 {
	animation-delay: -6.4285714285714s;
}
 svg#loading #rect5 {
	animation-delay: -8.5714285714286s;
}
 svg#loading #rect6 {
	animation-delay: -10.714285714286s;
}
 svg#loading #rect7 {
	animation-delay: -12.857142857143s;
}
@keyframes slide {
	0% {
		transform: translate(0,0);
	}
	2% {
		transform: translate(33px,0);
	}
	12.5% {
		transform: translate(33px,0);
	}
	15.5% {
		transform: translate(66px,0);
	}
	25% {
		transform: translate(66px,0);
	}
	27% {
		transform: translate(66px,33px);
	}
	37.5% {
		transform: translate(66px,33px);
	}
	39.5% {
		transform: translate(33px,33px);
	}
	50% {
		transform: translate(33px,33px);
	}
	52% {
		transform: translate(33px,66px);
	}
	62.5% {
		transform: translate(33px,66px);
	}
	64.5% {
		transform: translate(0,66px);
	}
	75% {
		transform: translate(0,66px);
	}
	77% {
		transform: translate(0,33px);
	}
	87.5% {
		transform: translate(0,33px);
	}
	89.5% {
		transform: translate(0,0);
	}
	100% {
		transform: translate(0,0);
	}
}
 @keyframes gradient1 {
	from {
		stop-color: #00919b;
	}
	50% {
		stop-color: #774c9e;
	}
	to {
		stop-color: #00919b;
	}
}
 @keyframes gradient2 {
	from {
		stop-color: #4aa06c;
	}
	50% {
		stop-color: #d61987;
	}
	to {
		stop-color: #4aa06c;
	}
}
@keyframes rotate {
	from{
		transform: rotate(0deg);
	}
	to{
		transform: rotate(360deg);
	}
}
 svg#loading {
	margin-left: 45%;
	width: 20rem;
	height: auto;
}
 svg#loading #gradient > stop[offset="0%"] {
	animation: gradient1 15s ease 0s infinite;
}
 svg#loading #gradient > stop[offset="100%"] {
	animation: gradient2 15s ease 0s infinite;
}
 svg#loading .rect {
	animation: slide 15s ease infinite;
}
 svg#loading #rect1 {
	animation-delay: 0s;
}
 svg#loading #rect2 {
	animation-delay: -2.1428571428571s;
}
 svg#loading #rect3 {
	animation-delay: -4.2857142857143s;
}
 svg#loading #rect4 {
	animation-delay: -6.4285714285714s;
}
 svg#loading #rect5 {
	animation-delay: -8.5714285714286s;
}
 svg#loading #rect6 {
	animation-delay: -10.714285714286s;
}
 svg#loading #rect7 {
	animation-delay: -12.857142857143s;
}
@media only screen and (max-width: 600px){  
	svg#loading {
	margin-left: 35%;
	
}
}

</style>