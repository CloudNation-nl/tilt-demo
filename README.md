# Tilt demonstration
 Repository for Tilt demo for CloudNation. Within this repository I will get into all interesting use cases for Tilt. 

Prerequisites:
- [x] [Tilt](http://tilt.dev)
- [x] [Helm](https://helm.sh/)
- [x] [Kubectl](https://kubernetes.io/docs/tasks/tools/)
- [x] [Docker](https://docker.com/)
- [x] [Minikube](https://minikube.sigs.k8s.io/docs/start/) in your local docker environment

# Benefits of Tilt
- [x] Usability
- [x] Local development
- [x] Logs
- [x] Hot reloading
- [x] Starlark coding, conditional deployments and builds

# Demo's
## Tilt & Kubernetes
In the `k8s` folder you will find an easy demonstration on how to use Tilt combined with kubernetes apps. We will make two deployments: 
- MongoDB deployment
- WebApp deployment

Furthermore we will define two services:
- MongoDB service
- WebApp service

Last but not least, we load a ConfigSet and Secrets for MongoDB. 

These are all defined in 4 `.yaml` files, listed in the `k8s` directory. Using Tilt, we port-forward the port for the WebApp pod (port `3000`) to the local `8080` port. We also make sure we are not deploying anything into the `default` namespace using a simple check. 

```
if k8s_namespace() == 'default':
  fail("failing early to avoid deploying to 'default' namespace")
```   

We can run and deploy this stack with just one command: `cd k8s && tilt up`. This will also provide us with a localhosted web-UI which gives us access to logs, service statusses and more. If we use the combination of `tilt up` and `tilt down` (just like you would be used to with `docker-compose`), the stack will be automatically removed and cleaned up if we stop tilt. The best for this would be `tilt up && tilt down`

### Running the Tilt & Kubernetes demo
```bash
cd k8s
tilt up && tilt down
```

## Tilt & Docker & Helm
For the Tilt & Docker part I have prepared a demo with the combination of Helm & Docker. As you can see in the `Tiltfile`, you're able to define docker-build steps within the Tiltfile. The build is automatically triggered as soon as Tilt finds a similar named image in one of your k8s definitions. 

Unfortunately there's one downside of the image buildsteps for Docker, namely the lack of defining the target build stage. To achieve the same functionality, we now need to split up buildstages into different Dockerfiles. 


## Tilt without containerized apps 
TBD