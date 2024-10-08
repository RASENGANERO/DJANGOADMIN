from datetime import datetime
from django.shortcuts import render
from django.http import HttpResponse,HttpRequest,JsonResponse,HttpResponseRedirect
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.csrf import csrf_exempt
from .models import *
from django.shortcuts import redirect
from django.db.models import Count
from .start import *

start=Start()




def loginuser(request):
    posts = Users.objects.all()
    request.session.set_expiry(0)
    response_data = {}
    if request.POST.get('action') == 'post':
        form_type=request.POST.get('form_admin_type')
        if form_type=='loginusers':
            login_name = request.POST.get('log_name')
            login_pass = request.POST.get('log_pass')
            response_data['log_name'] = login_name
            response_data['log_pass'] = login_pass
            user_check=Users.objects.filter(login=response_data['log_name'],password=response_data['log_pass']).count()
            if user_check==0:
                response_data['message']='Неверный логин или пароль!'
                #if request.is_ajax():
                #    request.session['login']='n'
                #    request.session['password']='n'
                #response_data['logerror']='Неверный логин или пароль!'
                return JsonResponse(response_data)
            else:
                response_data['message']='1'
                if request.is_ajax():
                    request.session['login']=login_name
                    request.session['password']=login_pass
               
                

                response_data['user_type']=Users.objects.get(login=response_data['log_name'],password=response_data['log_pass']).__dict__['user_type']
                if request.is_ajax():
                    request.session['user_type']=response_data['user_type']

                if response_data['user_type']=='Администратор платформы':
                    response_data['url']="/adminsys/"
                
                if response_data['user_type']=='Администратор группы':
                    response_data['url']="/admingroup/"
                   
                if response_data['user_type']=='Оператор группы':
                    response_data['url']="/operator/"   
                return JsonResponse(response_data)



def checkauth(request):
    request.session.set_expiry(0)
    return 1


def checkauthform(request):
    request.session.set_expiry(0)
    check_form=False
    if all(key in request.session for key in ['login', 'password','user_type']):
        check_form=False
    else:
        check_form=True
    return check_form

def get_userauth_info(request):
    s=Users.objects.get(login=request.session['login'],password=request.session['password'])
    name=s.__dict__['name']
    lastname=s.__dict__['lastname']
    user_type=s.__dict__['user_type']
    return [name,lastname,user_type]

def logoutuser(request):
    request.session.set_expiry(0)
    response_data = {}
    if request.POST.get('action') == 'post':
        form_type=request.POST.get('form_admin_type')
        if form_type=='logoutusers':
            if request.is_ajax():
                if 'login' in list(request.session.keys()):
                    dels(request)
        response_data['message']='Вы вышли из аккаунта'
        return JsonResponse(response_data)

def dels(request):
    del request.session['login']
    del request.session['password']
    del request.session['user_type']
    


def addgroup(request):
    request.session.set_expiry(0)
    response_data = {}
    if request.POST.get('action') == 'post':
        form_type=request.POST.get('form_admin_type')
        if form_type=='add_group':
            response_data['group_name'] = request.POST.get('group_name')
            response_data['group_status'] = request.POST.get('group_status')
            Groups.objects.create(
                                 groupname=response_data['group_name'],
                                 statusgroup=response_data['group_status']
                                 )
            return JsonResponse(response_data)

def delgroup(request):
    request.session.set_expiry(0)
    if request.POST.get('action') == 'post':
        form_type=request.POST.get('form_admin_type')
        if form_type=='del_group':
            groupname=request.POST.get('delgroupname')
            groupstat=request.POST.get('delgroupstatus')  
            Groups.objects.get(groupname=groupname,statusgroup=groupstat).delete()
            return JsonResponse({'del':'Пользователь удалён!'})

def adduser(request):
    request.session.set_expiry(0)
    response_data = {}
    if request.POST.get('action') == 'post':
        form_type=request.POST.get('form_admin_type')
        if form_type=='add_user':
            
            response_data['surname'] = request.POST.get('adduser_surname')
            response_data['name'] = request.POST.get('adduser_name')
            response_data['lastname'] = request.POST.get('adduser_lastname')
            response_data['login'] = request.POST.get('adduser_login')
            response_data['password'] = request.POST.get('adduser_password')
            response_data['user_type'] = request.POST.get('adduser_type')
            response_data['groupses'] = request.POST.get('adduser_groupses')
            response_data['user_status'] = request.POST.get('adduser_status')
           
            id_group=Groups.objects.get(groupname=response_data['groupses']).__dict__['id']
            #print(Groups.objects.get(id=id_group))
           
            if Users.objects.filter(login=response_data['login'],password=response_data['password']).count()!=0:
                response_data['message']='1'
                response_data['message_error']='Такой логин и пароль уже существует!'
                return JsonResponse(response_data)
            else:
                response_data['message']='Пользователь добавлен!'
                Users.objects.create(surname=response_data['surname'],
                                     name=response_data['name'],
                                     lastname=response_data['lastname'],
                                     login=response_data['login'],
                                     user_status=response_data['user_status'],
                                     password=response_data['password'],
                                     user_type=response_data['user_type'],
                                     user_group_id=Groups.objects.get(id=id_group),
                                     )
                return JsonResponse(response_data)
            
def deluser(request):
    request.session.set_expiry(0)
    response_data={}
    if request.POST.get('action') == 'post':
        form_type=request.POST.get('form_admin_type')
        if form_type=='del_user':
            user_login=request.POST.get('deluser_login')
            user_pass=request.POST.get('deluser_password')
            response_data['del']='Пользователь удалён!'
            if user_login==request.session['login'] and user_pass==request.session['password']:
                dels(request)
                response_data['message']='exit'
            else: 
                response_data['message']='nolog'
            Users.objects.get(
                              login=user_login,
                              password=user_pass,
                              ).delete()
            return JsonResponse(response_data)
    
    

def getuserscount(request):
    request.session.set_expiry(0)
    response_data = {}
    if request.POST.get('action') == 'post':
        form_type=request.POST.get('form_admin_type')
        if form_type=='getuserscount':
            response_data['count_user']=[Users.objects.filter(user_group_id_id=a['id']).count() for a in list(Groups.objects.values('id'))]
            return JsonResponse(response_data)




def adminsys(request):
    request.session.set_expiry(0)
    users=Users.objects.all()
    groups=Groups.objects.all()
    check=checkauthform(request)
    inf=get_userauth_info(request)
    #print(inf)
    return render(request,"app/adminsys.html",{"users":users,"groups":groups,"check":check,"info":inf})

def admingroup(request):
    request.session.set_expiry(0)
    check=checkauthform(request)
    id_all=Users.objects.get(login=request.session['login'],password=request.session['password']).__dict__['user_group_id_id']
    products=Products.objects.filter(id_group=id_all)
    reviews=Products.objects.none()
    for v in range(len(products)):reviews|=Reviews.objects.filter(id_product=products[v].__dict__['id'])
    
    users=Users.objects.filter(user_group_id=id_all)
    inf=get_userauth_info(request)
    
    return render(request, "app/admingroup.html",{"users":users,"products":products,"reviews":reviews,"check":check,"info":inf})

def operator(request):
    request.session.set_expiry(0)
    check=checkauthform(request)
    id_all=Users.objects.get(login=request.session['login'],password=request.session['password']).__dict__['user_group_id_id']
    products=Products.objects.filter(id_group=id_all)
    reviews=Products.objects.none()
    for v in range(len(products)):reviews|=Reviews.objects.filter(id_product=products[v].__dict__['id'])
    
    inf=get_userauth_info(request)
    
    return render(request, "app/operator.html",{"products":products,"reviews":reviews,"check":check,"info":inf})

def login(request):
    request.session.set_expiry(0)
    #print(request.session.keys())
    if 'login' in list(request.session.keys()):
        dels(request)
    check=checkauthform(request)
    
    return render(request, "app/login.html",{"check":check})


def startstoppars(request):
    request.session.set_expiry(0)
    type=None
    if request.POST.get('action') == 'post':
        form_type=request.POST.get('form_admin_type')
        if form_type=="startpars":
            type=bool(int(str(request.POST.get('startstop')).strip()))
            start.set_start(type)
    #print(START_PARSES)
    return JsonResponse({"status":str(type)})

# REST API
@csrf_exempt
def getcatprod(request):
    data={}
    type = request.POST.get("type")
    form_type=request.POST.get('form_admin_type')
    if form_type=="productsrest":
        prods=list(Products.objects.filter(area=type))
        prods=list(filter(None,[a.__dict__['product_url'] for a in prods]))
        data["data"]=prods
    return JsonResponse(data)

#def add_one_product(request):
#    pass

def add_many_product(request):
    s=request.FILES['catalog']
    print(s)


@csrf_exempt
def getparsestate(request):
    data={}
    data["parsestart"]=start.get_start()
    return JsonResponse(data)

#def catalog(request):
#    request.session.set_expiry(0)
#    return render(request, "app/catalog.html") 