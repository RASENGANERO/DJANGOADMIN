from django.db import models

class Groups(models.Model):
    groupname=models.TextField()
    statusgroup=models.TextField()    
      
class Users(models.Model):
    surname=models.TextField()
    name=models.TextField()
    lastname=models.TextField()
    login=models.TextField()
    user_status=models.TextField()
    password=models.TextField()
    user_type=models.TextField()
    user_group_id=models.ForeignKey(Groups, on_delete = models.CASCADE)

class Products(models.Model):
    product_name=models.TextField()
    area=models.TextField()
    collect_reviews=models.TextField()
    product_url=models.TextField()
    id_group=models.ForeignKey(Groups, on_delete = models.CASCADE)

class Reviews(models.Model):
    reviews_area=models.TextField()
    date_platform=models.DateTimeField()
    date_source=models.DateTimeField()
    reviews_text=models.TextField()
    reviews_status=models.TextField()
    reviews_url=models.TextField()
    reviews_rate=models.TextField()
    id_product=models.ForeignKey(Products, on_delete = models.CASCADE)