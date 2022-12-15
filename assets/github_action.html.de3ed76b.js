import{_ as o,r as a,o as l,c as p,a as n,b as e,w as u,d as s,e as r}from"./app.d6e58541.js";var d="/BiliOutils/images/125164385-81a75980-e1c4-11eb-9cda-79e0192ba894.png",m="/BiliOutils/images/125164394-92f06600-e1c4-11eb-877a-aaa599f2692e.png",k="/BiliOutils/images/125164694-13639680-e1c6-11eb-923d-edae6340d09d.png",_="/BiliOutils/images/125164475-efec1c00-e1c4-11eb-940b-aedb953e61b7.png",v="/BiliOutils/images/125164733-4a39ac80-e1c6-11eb-99be-9e07668874a3.png",b="/BiliOutils/images/gha_secret.png",h="/BiliOutils/images/125164864-0004fb00-e1c7-11eb-91c6-606b66365a71.png";const g={},f={id:"github-action",tabindex:"-1"},y=n("a",{class:"header-anchor",href:"#github-action","aria-hidden":"true"},"#",-1),x=s(" Github Action "),I=r('<p>\u4E0D\u76F4\u63A5\u63D0\u4F9B\u4F7F\u7528 Action \u8FD0\u884C\u7684\u65B9\u6CD5<br> \u4F53\u9A8C\u540E\u8BF7\u5C3D\u5FEB\u5220\u9664\u4ED3\u5E93<br> \u4F60\u4F1A\u53D1\u73B0 Action \u66B4\u9732\u4E86\u8FD0\u884C\u65E5\u5FD7\uFF08\u5305\u62EC\u7528\u6237\u540D\uFF0C\u786C\u5E01\u6570\uFF0C\u4F1A\u5458\u72B6\u6001\uFF09\u3002\u4F46\u5176\u5B9E\u8FD9\u662F\u6545\u610F\u7684\uFF0C\u76EE\u7684\u5C3D\u91CF\u4E0D\u8981\u4F7F\u7528\u6B64\u65B9\u5F0F\u8FD0\u884C</p><h2 id="\u521B\u5EFA\u4E00\u4E2A\u4ED3\u5E93" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u4E00\u4E2A\u4ED3\u5E93" aria-hidden="true">#</a> \u521B\u5EFA\u4E00\u4E2A\u4ED3\u5E93</h2><p>\u8BF7\u76F4\u63A5\u521B\u5EFA\u4E00\u4E2A\u4ED3\u5E93\uFF01\uFF01\uFF01</p><p><img src="'+d+'" alt="\u521B\u5EFA\u53C2\u8003"></p><h2 id="\u521B\u5EFA-github-action" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA-github-action" aria-hidden="true">#</a> \u521B\u5EFA Github Action</h2><p><img src="'+m+`" alt="\u521B\u5EFAyaml"></p><p>\u8DEF\u5F84\u4E00\u5B9A\u8981\u662F <code>.github/workflows/xxxxxxx.yaml</code><br> \u7C98\u8D34\u7684\u5185\u5BB9</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> bilibili<span class="token punctuation">-</span>task

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span> <span class="token comment"># \u624B\u52A8\u89E6\u53D1</span>
  <span class="token key atrule">schedule</span><span class="token punctuation">:</span> <span class="token comment"># \u8BA1\u5212\u4EFB\u52A1\u89E6\u53D1</span>
    <span class="token punctuation">-</span> <span class="token key atrule">cron</span><span class="token punctuation">:</span> <span class="token string">&#39;5 15 * * *&#39;</span>
  <span class="token comment"># cron\u8868\u8FBE\u5F0F\uFF0C\u65F6\u533A\u662FUTC\u65F6\u95F4\uFF0C\u6BD4\u6211\u4EEC\u665A8\u5C0F\u65F6\uFF0C\u8981\u7528\u6211\u4EEC\u7684\u65F6\u95F4\u51CF\u53BB8\u5C0F\u65F6\u540E\u586B\u4E0A\u53BB\uFF0C\u5982\u4E0A\u6240\u8868\u793A\u7684\u662F\u6BCF\u592923\u70B95\u5206</span>
  <span class="token comment"># \u5EFA\u8BAE\u6BCF\u4E2A\u4EBA\u90FD\u4FEE\u6539\u4E0B\u65F6\u95F4\uFF01\u4E0D\u8981\u4F7F\u7528\u9ED8\u8BA4\u65F6\u95F4\uFF01\u6700\u597D\u4E0D\u8981\u8BBE\u5B9A\u5728\u6574\u70B9\uFF0C\u9519\u5F00\u5CF0\u503C\uFF0C\u907F\u514D\u5927\u91CFG\u7AD9\u540C\u4E00\u4E2AIP\u5728\u76F8\u540C\u65F6\u95F4\u53BB\u8BF7\u6C42B\u7AD9\u63A5\u53E3\uFF0C\u5BFC\u81F4IP\u88AB\u7981\uFF01</span>
  <span class="token comment"># 30 \u5929\u5185\u4ED3\u5E93\u6CA1\u6709\u4EFB\u4F55\u6D3B\u52A8\u8FF9\u8C61\uFF0C\u4F1A\u6682\u505C\u81EA\u52A8\u8FD0\u884C</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">run-bilibili-tool</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">environment</span><span class="token punctuation">:</span> Production
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token comment"># \u8F93\u51FAIP</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> IP
        <span class="token key atrule">run</span><span class="token punctuation">:</span> sudo curl ifconfig.me
      <span class="token comment"># \u8BBE\u7F6E\u670D\u52A1\u5668\u65F6\u533A\u4E3A\u4E1C\u516B\u533A</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Set time zone
        <span class="token key atrule">run</span><span class="token punctuation">:</span> sudo timedatectl set<span class="token punctuation">-</span>timezone &#39;Asia/Shanghai&#39;
      <span class="token comment"># \u8FD0\u884C</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run APP
        <span class="token key atrule">timeout-minutes</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span>secrets.TIMEOUT_MINUTES <span class="token punctuation">|</span><span class="token punctuation">|</span> 60<span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token comment"># \u8D85\u65F6\u65F6\u95F4(\u5206\u949F)</span>
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          sudo docker run \\
           --env BILITOOLS_CONFIG=&quot;\${{ secrets.BILITOOLS_CONFIG }}&quot; \\
           -i --rm \\
           catlair/bilitools:latest</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+k+'" alt="\u586B\u5199"></p><p>\u63D0\u4EA4\u4FEE\u6539</p><p><img src="'+_+'" alt="\u63D0\u4EA4"></p><h2 id="\u4FEE\u6539\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539\u914D\u7F6E" aria-hidden="true">#</a> \u4FEE\u6539\u914D\u7F6E</h2>',12),O=s("\u70B9\u51FB\u83B7\u53D6\u914D\u7F6E\u8BE6\u60C5\u548C\u53C2\u8003\u914D\u7F6E"),B=s("\u4E3A\u4E86\u914D\u7F6E\u5B89\u5168\uFF0C\u5E94\u8BE5\u5C06\u914D\u7F6E\u590D\u5236\u5230\u6B64\u5904\u5E76\u8FDB\u884C "),w=n("strong",null,"GZIP \u538B\u7F29",-1),L=s(),T={href:"https://www.baidufe.com/fehelper/en-decode/",target:"_blank",rel:"noopener noreferrer"},N=s("https://www.baidufe.com/fehelper/en-decode/"),P=n("p",null,"\u5C06\u538B\u7F29\u540E\u7684\u914D\u7F6E\u590D\u5236\u5230\u9879\u76EE\u7684 secrets \u4E2D",-1),A=n("p",null,[n("img",{src:v,alt:"\u914D\u7F6E"})],-1),G=n("p",null,"\u586B\u5199\u914D\u7F6E",-1),S=n("p",null,[s("\u540D\u5B57\u662F "),n("code",null,"BILITOOLS_CONFIG"),s("\uFF0C\u503C\u662F\u4F60\u538B\u7F29\u540E\u7684\u914D\u7F6E\u3002")],-1),C=n("p",null,[n("img",{src:b,alt:"bili_config"})],-1),V=n("p",null,"\u8FD0\u884C Action",-1),E=n("p",null,[n("img",{src:h,alt:"action"})],-1);function F(R,U){const t=a("TestedVersion"),i=a("RouterLink"),c=a("ExternalLinkIcon");return l(),p("div",null,[n("h2",f,[y,x,e(t,{type:"action"})]),I,n("p",null,[e(i,{to:"/config/"},{default:u(()=>[O]),_:1})]),n("p",null,[B,w,L,n("a",T,[N,e(c)])]),P,A,G,S,C,V,E])}var z=o(g,[["render",F],["__file","github_action.html.vue"]]);export{z as default};
