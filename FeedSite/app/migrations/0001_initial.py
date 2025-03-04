# Generated by Django 3.2.14 on 2022-10-29 15:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Groups',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('groupname', models.TextField()),
                ('statusgroup', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.TextField()),
                ('area', models.TextField()),
                ('collect_reviews', models.TextField()),
                ('id_group', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='app.groups')),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('surname', models.TextField()),
                ('name', models.TextField()),
                ('lastname', models.TextField()),
                ('username', models.TextField()),
                ('password', models.TextField()),
                ('user_type', models.TextField()),
                ('user_group_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='app.groups')),
            ],
        ),
        migrations.CreateModel(
            name='Reviews',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reviews_area', models.TextField()),
                ('date_platform', models.DateTimeField()),
                ('date_source', models.DateTimeField()),
                ('reviews_text', models.TextField()),
                ('reviews_status', models.TextField()),
                ('reviews_url', models.TextField()),
                ('reviews_rate', models.TextField()),
                ('id_tovar', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='app.products')),
            ],
        ),
    ]
