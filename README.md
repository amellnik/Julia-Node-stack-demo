# Julia-Node-stack-demo

This is a very minimal example of a node website that uses a julia backend via [node-julia](https://www.npmjs.com/package/node-julia) to perform some calculation.  Upload a two-column csv and input a number of groups to run Clustering.jl's kmeans on it.  The results are plotted using [Plotly.js](https://plot.ly/javascript/).

The styling is done using [Skeleton](http://getskeleton.com/).

### Setting up

Make sure you have node and the Clustering.jl module. 

    npm install 
    node index.js

Go to [localhost:8124](localhost:8124).

You should see:

![Input page](https://github.com/amellnik/Julia-Node-stack-demo/blob/master/doc/input.PNG)
 
Upload one of the sample csv files or your own, enter the number of clusters, then click submit.
 
![Output page](https://github.com/amellnik/Julia-Node-stack-demo/blob/master/doc/output.PNG)
