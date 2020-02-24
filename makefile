init:
	npm init -y
login:
	npm login
publish:
	# Our preversion, version, and postversion will run, create a new tag in git and push it to our remote repository. 
	npm version patch
	npm run build
	npm publish


