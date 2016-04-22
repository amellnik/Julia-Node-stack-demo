# Julia-Node-stack-demo

This is a very minimal example of a node website that uses a julia backend via [node-julia](https://www.npmjs.com/package/node-julia) to perform some calculation.  Upload a two-column csv and number of groups to run Clustering.jl's kmeans on it.  The results are logged to the javascript console because I haven't gotten around to having it do real output yet.

The input page uses [Skeleton](http://getskeleton.com/) which is awesome.

### Setting up

Make sure you have node and the Clustering.jl module. 

    npm install 
    node index.js

Go to (localhost:8124)[localhost:8124].

![Input page](.\doc\input.png)
 
![Output page](.\doc\out.png)