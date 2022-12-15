import{_ as o,r as s,o as r,c as d,a as n,b as a,w as u,d as e,e as i}from"./app.d6e58541.js";var p="/BiliOutils/images/119254819-25c04b80-bbeb-11eb-9aec-67977eb7ddba.png",v="/BiliOutils/images/119254821-2822a580-bbeb-11eb-8b41-fd5bbac584fc.png",b="/BiliOutils/images/119254825-29ec6900-bbeb-11eb-9bea-22b08d402916.png";const m={},_=n("h2",{id:"action-scf-\u6587\u6863",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#action-scf-\u6587\u6863","aria-hidden":"true"},"#"),e(" Action SCF \u6587\u6863")],-1),h=e("\u5DF2\u7ECF\u5E9F\u5F03"),k=n("h2",{id:"\u521B\u5EFA\u4ED3\u5E93",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u521B\u5EFA\u4ED3\u5E93","aria-hidden":"true"},"#"),e(" \u521B\u5EFA\u4ED3\u5E93")],-1),g=e("\u53C2\u8003 "),E=e("\u4F7F\u7528 Action \u8FD0\u884C"),x=n("code",null,".github/workflows/xxxxxxx.yaml",-1),f=e(" \u5185\u5BB9\u5982\u4E0B"),T=i(`<div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> bilibili<span class="token punctuation">-</span>deploy

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span> <span class="token comment"># \u624B\u52A8\u89E6\u53D1</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">deploy-bilibili-tool</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">environment</span><span class="token punctuation">:</span> Production
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run Deploy
        <span class="token key atrule">timeout-minutes</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span>secrets.TIMEOUT_MINUTES <span class="token punctuation">|</span><span class="token punctuation">|</span> 15<span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token comment"># \u8D85\u65F6\u65F6\u95F4(\u5206\u949F)</span>
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          sudo docker run \\
           --env BILITOOLS_CONFIG=&quot;\${{ secrets.BILITOOLS_CONFIG }}&quot; \\
           --env TENCENT_SECRET_ID=&quot;\${{ secrets.TENCENT_SECRET_ID }}&quot; \\
           --env TENCENT_SECRET_KEY=&quot;\${{ secrets.TENCENT_SECRET_KEY }}&quot; \\
           --env RUN_SCF_ALL=y \\
           -i --rm  \\
           catlair/bilitools-deploy:latest</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u5904\u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF <code>RUN_SCF_ALL</code> \u503C\u4E3A <code>y</code>\uFF08\u9ED8\u8BA4 <code>n</code> \uFF09\u3002\u5728\u90E8\u7F72\u5B8C\u6210\u540E\u4F1A\u8FD0\u884C\u81EA\u52A8\u8FD0\u884C\u4E00\u6B21\u4E91\u51FD\u6570\uFF08\u6240\u6709\u7528\u6237\uFF09\uFF0C\u65B9\u4FBF\u67E5\u770B\u914D\u7F6E\u662F\u5426\u6B63\u786E</p><h2 id="github-secrets" tabindex="-1"><a class="header-anchor" href="#github-secrets" aria-hidden="true">#</a> Github secrets</h2><p>secrets \u914D\u7F6E\u5982\u4E0B</p><p><img src="`+p+'" alt="setting"></p><p><img src="'+v+'" alt="setting-new"></p><p><img src="'+b+'" alt="setting-new-2"></p>',7),y=n("strong",null,"BILITOOLS_CONFIG \u662F\u538B\u7F29\u4E86\u7684",-1),N=e(),C={href:"https://www.baidufe.com/fehelper/en-decode/index.html",target:"_blank",rel:"noopener noreferrer"},I=e("\u5728\u8FD9\u91CC\u9009\u62E9 gzip \u538B\u7F29"),L=i(`<h2 id="\u9519\u8BEF\u6848\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u9519\u8BEF\u6848\u4F8B" aria-hidden="true">#</a> \u9519\u8BEF\u6848\u4F8B</h2><h3 id="\u5077\u61D2" tabindex="-1"><a class="header-anchor" href="#\u5077\u61D2" aria-hidden="true">#</a> \u5077\u61D2\uFF1F</h3><p>\u81EA\u5DF1\u4E0D\u4F1A\u521B\u5EFA\u4ED3\u5E93\uFF1F\u522B fork \u672C\u4ED3\u5E93<br> \u8BF7\u52FF\u76F4\u63A5 fork \u672C\u4ED3\u5E93\uFF01\uFF01\uFF01<br> \u8BF7\u52FF\u76F4\u63A5 fork \u672C\u4ED3\u5E93\uFF01\uFF01\uFF01<br> \u8BF7\u52FF\u76F4\u63A5 fork \u672C\u4ED3\u5E93\uFF01\uFF01\uFF01<br> \u8BF7\u76F4\u63A5\u521B\u5EFA\u4E00\u4E2A\u4ED3\u5E93\uFF01\uFF01\uFF01<br> \u8BF7\u76F4\u63A5\u521B\u5EFA\u4E00\u4E2A\u4ED3\u5E93\uFF01\uFF01\uFF01<br> \u8BF7\u76F4\u63A5\u521B\u5EFA\u4E00\u4E2A\u4ED3\u5E93\uFF01\uFF01\uFF01<br> \u4F60\u81EA\u5DF1\u8FD8\u53EF\u4EE5\u521B\u5EFA\u79C1\u6709\u4ED3\u5E93\u554A\uFF01\uFF01\uFF01<br> \u4F60\u81EA\u5DF1\u8FD8\u53EF\u4EE5\u521B\u5EFA\u79C1\u6709\u4ED3\u5E93\u554A\uFF01\uFF01\uFF01<br> \u4F60\u81EA\u5DF1\u8FD8\u53EF\u4EE5\u521B\u5EFA\u79C1\u6709\u4ED3\u5E93\u554A\uFF01\uFF01\uFF01</p><h3 id="\u672A\u6309\u8981\u6C42\u538B\u7F29\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u672A\u6309\u8981\u6C42\u538B\u7F29\u914D\u7F6E" aria-hidden="true">#</a> \u672A\u6309\u8981\u6C42\u538B\u7F29\u914D\u7F6E</h3><p><strong>\u518D\u4E09\u5F3A\u8C03\u914D\u7F6E\u9700\u8981\u538B\u7F29</strong><br> \u51FA\u73B0\u4E0B\u9762\u8FD9\u79CD\uFF0CBILITOOLS_CONFIG \u7684\u914D\u7F6E\u6709\u597D\u591A\u884C\uFF0C\u8FD9\u660E\u663E\u5C31\u662F\u6CA1\u6709<strong>\u538B\u7F29</strong><br><code>syntax error near unexpected token (&#39;</code> \u9519\u8BEF\u4FE1\u606F\u4E5F\u660E\u786E\u6307\u51FA\u662F\u56E0\u4E3A\u7279\u6B8A\u7B26\u53F7\u5BFC\u81F4\u9519\u8BEF</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>  sudo docker run \\
   --env BILITOOLS_CONFIG=&quot;***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
  ***&quot; \\
   --env TENCENT_SECRET_ID=&quot;***&quot; \\
   --env TENCENT_SECRET_KEY=&quot;***&quot; \\
   --env RUN_SCF_ALL=y \\
   -i --rm  \\
   catlair/bilitools-deploy:latest
  shell: /usr/bin/bash -e ***0***
/home/runner/work/_temp/5ce701de-530a-4127-8121-94b88d4abe8d.sh: line 13: syntax error near unexpected token \`(&#39;
Error: Process completed with exit code 2.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function O(S,w){const t=s("Badge"),l=s("RouterLink"),c=s("ExternalLinkIcon");return r(),d("div",null,[_,n("p",null,[h,a(t,{type:"warning",text:"\u8B66\u544A",vertical:"top"})]),k,n("p",null,[g,a(l,{to:"/guide/github_action.html"},{default:u(()=>[E]),_:1}),x,f]),T,n("p",null,[y,N,n("a",C,[I,a(c)])]),L])}var q=o(m,[["render",O],["__file","action_scf.html.vue"]]);export{q as default};
