<template><div><h1 id="vue-json-component" tabindex="-1"><a class="header-anchor" href="#vue-json-component" aria-hidden="true">#</a> Vue JSON Component</h1>
<p><a href="https://badge.fury.io/js/vue-json-component" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/vue-json-component.svg" alt="npm version"><ExternalLinkIcon/></a> <img src="https://img.shields.io/bundlephobia/min/vue-json-component.svg" alt="npm bundle size"> <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"><ExternalLinkIcon/></a></p>
<p><a href="http://tylerkrupicka.com/vue-json-component/" target="_blank" rel="noopener noreferrer">Demo<ExternalLinkIcon/></a></p>
<p>I modified this <a href="https://github.com/tylerkrupicka/vue-json-component" target="_blank" rel="noopener noreferrer">Original package<ExternalLinkIcon/></a> to Vue 3 full support.
I removed a lot of package's and unneeded modules. Now only reg dependencies is Vue 3
Now you can use it with vue 3 with no problem.</p>
<p>A collapsable tree view for JSON. This package has some similarites with <a href="https://github.com/michaelfitzhavey/vue-json-tree-view" target="_blank" rel="noopener noreferrer">vue-json-tree-view<ExternalLinkIcon/></a> so I'll address the differences below. I'm not contributing this back to that package because it would require breaking API changes, and the code is entirely different. <strong>Contributions welcome!</strong></p>
<p><img src="https://user-images.githubusercontent.com/5761061/55198958-7fa16400-518e-11e9-8448-7cd028007920.png" alt="demo image"></p>
<h2 id="philosophy" tabindex="-1"><a class="header-anchor" href="#philosophy" aria-hidden="true">#</a> Philosophy</h2>
<p>This package has a few major improvements over predecessors: builds, styles, and customization. For builds, this package ships CommonJS, Module, and UNPKG builds with no dependencies. <a href="https://github.com/michaelfitzhavey/vue-json-tree-view" target="_blank" rel="noopener noreferrer">vue-json-tree-view<ExternalLinkIcon/></a> bundles in lots of dependencies -- including lodash. I also export global Vue imports, local Vue imports.
The code itself is about as small as it can be while being easy to follow.</p>
<ul>
<li><a href="https://bundlephobia.com/result?p=vue-json-tree-view@2.1.4" target="_blank" rel="noopener noreferrer">vue-json-tree-view (84KB)<ExternalLinkIcon/></a></li>
<li><a href="https://bundlephobia.com/result?p=vue-json-component@0.3.0" target="_blank" rel="noopener noreferrer">vue-json-component (9KB)<ExternalLinkIcon/></a></li>
</ul>
<p>The styles in this package are all scoped, with key colors still being customizable. There are no extra margins or overflow rules and text properties are all inherited from the page. This makes the view much easier to integrate anywhere you need it.</p>
<p>The default color theme is based on solarized, and font weights are modified to increase readability. The component uses semantic HTML elements and tries to be fully keyboard accessible.</p>
<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2>
<h3 id="install" tabindex="-1"><a class="header-anchor" href="#install" aria-hidden="true">#</a> Install</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i vue-json-component-vue-3
<span class="token function">yarn</span> <span class="token function">add</span> vue-json-component-vue-3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="import-locally" tabindex="-1"><a class="header-anchor" href="#import-locally" aria-hidden="true">#</a> Import Locally</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> JSONView <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue-json-component-vue-3'</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="import-globally" tabindex="-1"><a class="header-anchor" href="#import-globally" aria-hidden="true">#</a> Import Globally</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> JSONView <span class="token keyword">from</span> <span class="token string">'vue-json-component-vue-3'</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>JSONView<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="use" tabindex="-1"><a class="header-anchor" href="#use" aria-hidden="true">#</a> Use</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>JSONView <span class="token operator">:</span>data<span class="token operator">=</span><span class="token string">"data"</span> <span class="token operator">/</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="customize" tabindex="-1"><a class="header-anchor" href="#customize" aria-hidden="true">#</a> Customize</h3>
<p>The font size and font family are inherited from the page. The component now supports dark mode, and has switched to a CSS Variables based implementation.</p>
<h4 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h4>
<ul>
<li><strong>data</strong> (JSON): The valid JSON object you want rendered as a tree.</li>
<li><strong>rootKey</strong> (String): The name of the top level root key; defaults to root.</li>
<li><strong>maxDepth</strong> (Number): Depth of the tree that is open at first render; defaults to 1.</li>
<li><strong>colorScheme (New)</strong> (String): Setting to 'dark' enables dark mode.</li>
</ul>
<h4 id="styles" tabindex="-1"><a class="header-anchor" href="#styles" aria-hidden="true">#</a> Styles</h4>
<p>⚠️ This API has changed to CSS Variables. All of these can be customized for light <em>and</em> dark mode as is documented below.</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token property">--vjc-key-color</span><span class="token punctuation">:</span> #0977e6<span class="token punctuation">;</span>
<span class="token property">--vjc-valueKey-color</span><span class="token punctuation">:</span> #073642<span class="token punctuation">;</span>
<span class="token property">--vjc-string-color</span><span class="token punctuation">:</span> #268bd2<span class="token punctuation">;</span>
<span class="token property">--vjc-number-color</span><span class="token punctuation">:</span> #2aa198<span class="token punctuation">;</span>
<span class="token property">--vjc-boolean-color</span><span class="token punctuation">:</span> #cb4b16<span class="token punctuation">;</span>
<span class="token property">--vjc-null-color</span><span class="token punctuation">:</span> #6c71c4<span class="token punctuation">;</span>
<span class="token property">--vjc-arrow-size</span><span class="token punctuation">:</span> 6px<span class="token punctuation">;</span>
<span class="token property">--vjc-arrow-color</span><span class="token punctuation">:</span> #444<span class="token punctuation">;</span>
<span class="token property">--vjc-hover-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0.15<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>template<span class="token operator">></span>
  <span class="token operator">&lt;</span>JSONView
    <span class="token operator">:</span>data<span class="token operator">=</span><span class="token string">"data"</span>
    rootKey<span class="token operator">=</span><span class="token string">"view"</span>
    <span class="token operator">:</span>maxDepth<span class="token operator">=</span><span class="token string">"1"</span>
    <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"customize"</span>
  <span class="token operator">/</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>

<span class="token operator">&lt;</span>style lang<span class="token operator">=</span><span class="token string">"scss"</span> scoped<span class="token operator">></span>
<span class="token punctuation">.</span>customize <span class="token punctuation">{</span>
  <span class="token operator">--</span>vjc<span class="token operator">-</span>valueKey<span class="token operator">-</span>color<span class="token operator">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">.</span>customize<span class="token punctuation">.</span>dark <span class="token punctuation">{</span>
  <span class="token operator">--</span>vjc<span class="token operator">-</span>valueKey<span class="token operator">-</span>color<span class="token operator">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>style<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Note: your styles will need to be scoped to override the scoped CSS Variables in the component.</p>
<h2 id="advanced-features" tabindex="-1"><a class="header-anchor" href="#advanced-features" aria-hidden="true">#</a> Advanced Features</h2>
<h3 id="selected-item-events" tabindex="-1"><a class="header-anchor" href="#selected-item-events" aria-hidden="true">#</a> Selected Item Events</h3>
<p>You can allow users to click elements, and receive an event when this occurs. The <code v-pre>selected</code> event will pass you the key, value, and path of the selected value. If you do not listen for the event, the styles will not indicate that values are clickable.</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>JSONView
  <span class="token operator">:</span>data<span class="token operator">=</span><span class="token string">"data"</span>
  v<span class="token operator">-</span>on<span class="token operator">:</span>selected<span class="token operator">=</span><span class="token string">"itemSelected"</span>
<span class="token operator">/</span><span class="token operator">></span>

## Contributing

Contributions are welcome via pull request<span class="token punctuation">.</span> If you want to discuss your feature before committing development time<span class="token punctuation">,</span> feel free to open an issue and we can refine the idea<span class="token punctuation">.</span>

Thanks<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


