<h1>custom framework</h1>

<span>allows building of web components from html and js files</span>

<code class="flex-auto truncate db"><span>npm i -g<!-- --> custom_framework</span></code></span>

<h3>Project Structure</h3><br/>
<code>
<span style="white-space: pre;line-height:0.9ch;">ROOT</span><br/>
<span style="white-space: pre;line-height:0.9ch;">|</span><br/>
<span style="white-space: pre;line-height:0.9ch;">+---customfw.json</span><br/>
<span style="white-space: pre;line-height:0.9ch;">|</span><br/>
<span style="white-space: pre;line-height:0.9ch;">+---build</span><br/>
<span style="white-space: pre;line-height:0.9ch;">|   +---pack</span><br/>
<span style="white-space: pre;line-height:0.9ch;">|   |   \---build.js</span><br/>
<span style="white-space: pre;line-height:0.9ch;">|   \---unpack</span><br/>
<span style="white-space: pre;line-height:0.9ch;">|       \---*.js // indivisual built components and temp html files.</span><br/>
<span style="white-space: pre;line-height:0.9ch;">\---src</span><br/>
<span style="white-space: pre;line-height:0.9ch;">    \--- */**.html //input files</span><br/>
</code>

<h3>Script integrations</h3>

Within script tags inside of components you can add an additional <code>init</code> attribute that will cause the script to be executed ONCE with the constructor and state variables exposed. constructor can be modified to extend the prototype of the element. the state variable is also exposed and can be modified.

If the above attribute is not present the variables self, constructor, root, and state are exposed. this script will execute whenever the an instance of the element is created.


<h3> variables </h3>
<ul>
  <li>
    constructor - the constructor object of the element.
  </li>
  <li>
    self - the element the operation is being performed on.
  </li>
  <li>
    root - the shadowRoot of the element (you will probally use this more than self).
  </li>
  <li>
    state - a map that is shared between all instances made using this framework.
    </li>
</ul>

<h3>
  command
</h3>
adds 1 command customfw

can take 1 argument -w to determine if watching will occure.
to use run in the project directory (this is the directory that contains the customfw.json file)