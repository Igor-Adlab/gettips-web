#!/usr/bin/env php
<?php

$url = 'https://fcm.googleapis.com/fcm/send';

$YOUR_API_KEY = 'AAAA3jza94s:APA91bHQE5WVtBtIw8nnOHmsQs7yAjisPnPkiir1VT_a4LFp19D9YAplf0HTV-SXrVJ5qoFDiBL7HimN55ivGnjm_HBMhPee6H28j-luCSF0PAlC97bDToOlO3Il4POx86gU4xtHiqjX'; // Server key
$YOUR_TOKEN_ID = 'd1tNNoGSdj5GTP6Xn2FpLn:APA91bGIvWDo_2ckb7RV3G49XL8ieVEqDLgkIT4FbyUFltjuhzkUxsW-q9DIEO_eTI7JmL_7puB4HfPssS1Cm5Dnp-cb0PyLb0thy55dzi7kuYzxvUDcXCdMLntvF1SJxzzZnoClaIak'; // Client token id

$request_body = [
    'to' => $YOUR_TOKEN_ID,
    'notification' => [
        'title' => 'Test App',
        'click_action' => 'http://google.com/',
        'body' => sprintf('Начало в %s.', date('H:i')),
        'icon' => 'https://picsum.photos/seed/picsum/200/300',
    ],
];
$fields = json_encode($request_body);

$request_headers = [
    'Content-Type: application/json',
    'Authorization: key=' . $YOUR_API_KEY,
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_HTTPHEADER, $request_headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($ch);
curl_close($ch);

echo $response;