(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{10:function(e,n,t){},4:function(e,n,t){e.exports=t(5)},5:function(e,n,t){"use strict";t.r(n);var a=t(1),r=t(0),o=t.n(r),l=t(3),i=t.n(l);t(10);function u(e){return o.a.createElement("button",{className:"square",onClick:e.onClick},e.value)}function c(e){return o.a.createElement("button",{style:{color:"red"},className:"square",onClick:e.onClick},e.value)}function s(e){for(var n=function(n){return e.winner&&function(e,n){for(var t=0;t<n.line.length;t++)if(e===n.line[t])return!0;return!1}(n,e.winner)?o.a.createElement(c,{value:e.squares[n],onClick:function(){return e.onClick(n)},iddd:n}):o.a.createElement(u,{value:e.squares[n],onClick:function(){return e.onClick(n)},iddd:n})},t=[],a=0;a<e.gameConfig.nRow;a++){for(var r=[],l=0;l<e.gameConfig.nCol;l++)r.push(n(e.gameConfig.nCol*a+l));t.push(o.a.createElement("div",{className:"board-row"},r))}return o.a.createElement("div",null,t)}function m(){var e=Object(r.useState)({nRow:3,nCol:3,nWinCondition:3}),n=Object(a.a)(e,2),t=n[0],l=n[1],i=Object(r.useState)([{squares:Array(t.nRow*t.nCol).fill(null),position:{col:-1,row:-1},stepNumber:0,isDraw:!1,isWin:!1,latestSquareIndex:-1}]),u=Object(a.a)(i,2),c=u[0],m=u[1],b=Object(r.useState)(0),g=Object(a.a)(b,2),E=g[0],v=g[1],w=Object(r.useState)(!0),h=Object(a.a)(w,2),N=h[0],k=h[1],q=Object(r.useState)(!0),W=Object(a.a)(q,2),R=W[0],y=W[1],O=c.slice(0,c.length);R?O.sort((function(e,n){return e.stepNumber-n.stepNumber})):O.sort((function(e,n){return n.stepNumber-e.stepNumber}));var j,I=O.map((function(e,n){var t=e.stepNumber?"Go to move #".concat(e.stepNumber," (col: ").concat(e.position.col,"), row: ").concat(e.position.row,")"):"Go to game start";return e.stepNumber===E?o.a.createElement(p,{i:e.stepNumber,description:t}):o.a.createElement(f,{i:e.stepNumber,description:t,onClick:function(){return function(e){v(e),k(e%2===0)}(e.stepNumber)}})})),S=c[E],x=d(S.squares,S.latestSquareIndex,t);return j=S.isWin?"Winner: "+x.square:S.isDraw?"Draw !":"Next player: "+(N?"X":"O"),o.a.createElement("div",{className:"game"},o.a.createElement("div",{className:"game-board"},o.a.createElement(s,{squares:S.squares,onClick:function(e){return function(e){var n=c.slice(0,E+1),a=n[n.length-1],r=a.squares.slice();if(!a.isWin&&!r[e]){r[e]=N?"X":"O";var o=!1,l=!1;d(r,e,t)?o=!0:function(e){for(var n=0;n<e.length;n++)if(null==e[n])return!1;return!0}(r)&&(l=!0),v(n.length),m(n.concat([{squares:r,position:{col:Math.floor(e%t.nCol)+1,row:Math.floor(e/t.nCol)+1},stepNumber:n.length,isWin:o,isDraw:l,latestSquareIndex:e}])),k(!N)}}(e)},winner:x,gameConfig:t})),o.a.createElement("div",{className:"game-info"},o.a.createElement("div",null,j),o.a.createElement("ol",null,I)),o.a.createElement("div",{className:"game-info"},o.a.createElement("div",null,o.a.createElement("label",{class:"switch"},o.a.createElement("input",{type:"checkbox",onClick:function(){y(!R)}}),o.a.createElement("span",{class:"slider round"})))),o.a.createElement("div",{className:"game-info"},o.a.createElement(C,{gameConfig:t,handleInputChange:function(e){"nCol"===e.name?l({nRow:t.nRow,nCol:parseInt(e.value),nWinCondition:t.nWinCondition}):"nRow"===e.name?l({nRow:parseInt(e.value),nCol:t.nCol,nWinCondition:t.nWinCondition}):"nWinCondition"===e.name&&l({nRow:t.nRow,nCol:t.nCol,nWinCondition:parseInt(e.value)}),m([{squares:Array(t.nRow*t.nCol).fill(null),position:{col:-1,row:-1},stepNumber:0,isDraw:!1,isWin:!1,latestSquareIndex:-1}]),v(0),k(!0),y(!0)}})))}function C(e){var n=function(n){var t=n.target;e.handleInputChange(t)};return o.a.createElement("form",null,o.a.createElement("legend",null,"Number of rows:"),o.a.createElement("input",{name:"nRow",type:"number",value:e.gameConfig.nRow,onChange:n}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("legend",null,"Number of rows:"),o.a.createElement("input",{name:"nCol",type:"number",value:e.gameConfig.nCol,onChange:n}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("legend",null,"Length to win:"),o.a.createElement("input",{name:"nWinCondition",type:"number",value:e.gameConfig.nWinCondition,onChange:n}))}function f(e){return o.a.createElement("li",{key:e.i},o.a.createElement("button",{onClick:function(){return e.onClick()}},e.description))}function p(e){return o.a.createElement("li",{key:e.i},o.a.createElement("button",null,o.a.createElement("b",null,e.description)))}function d(e,n,t){for(var a=[0,0,1,-1,-1,1,-1,1],r=[1,-1,0,0,-1,1,1,-1],o=Math.floor(n/t.nCol),l=n%t.nCol,i=0;i<a.length;i+=2){for(var u=[],c=o,s=l,m=c*t.nCol+s,C=0;c>=0&&c<=t.nRow-1&&s>=0&&s<=t.nCol-1&&e[m]===e[n];)u.push(m),C++,s+=r[i],m=(c+=a[i])*t.nCol+s;s=l,m=(c=o)*t.nCol+s;for(var f=0;c>=0&&c<=t.nRow-1&&s>=0&&s<=t.nCol-1&&e[m]===e[n];)u.push(m),f++,s+=r[i+1],m=(c+=a[i+1])*t.nCol+s;if(C+f-1===t.nWinCondition)return{square:e[n],line:u}}return null}i.a.render(o.a.createElement(m,null),document.getElementById("root"))}},[[4,1,2]]]);
//# sourceMappingURL=main.5a4b7ae8.chunk.js.map