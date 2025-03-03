```
├── index.html
├── openapi.yaml
└── paths
    ├── auth.yaml
    ├── checkpoints.yaml
    ├── likes.yaml
    ├── routes.yaml
    ├── tags.yaml
    └── user.yaml
```

```yaml
# openapi.yaml
openapi: "3.0.3"
info:
  title: Sushigon API
  version: "1.0.0"
  description: API specification for the Sushigon project.
servers:
  - url: http://localhost:8080
  - url: https://x162-43-27-150.static.xvps.ne.jp
  - url: http://x162-43-27-150.static.xvps.ne.jp
paths:
  /api/tags:
    $ref: "./paths/tags.yaml"
  /api/search:
    $ref: "./paths/routes.yaml#/paths/~1api~1search"
  /api/routes:
    $ref: "./paths/routes.yaml#/paths/~1api~1routes"
  /api/routes/{route_id}:
    $ref: "./paths/routes.yaml#/paths/~1api~1routes~1{route_id}"
  /api/routes/{route_id}/like:
    $ref: "./paths/likes.yaml"
  /api/routes/{route_id}/checkpoints:
    $ref: "./paths/checkpoints.yaml#/paths/~1api~1routes~1{route_id}~1checkpoints"
  /api/routes/{route_id}/checkpoints/{checkpoint_index}/visit:
    $ref: "./paths/checkpoints.yaml#/paths/~1api~1routes~1{route_id}~1checkpoints~1{checkpoint_index}~1visit"
  /api/user:
    $ref: "./paths/user.yaml"
  /api/auth/register:
    $ref: "./paths/auth.yaml#/paths/~1api~1auth~1register"
  /api/auth/login:
    $ref: "./paths/auth.yaml#/paths/~1api~1auth~1login"
  /api/auth/logout:
    $ref: "./paths/auth.yaml#/paths/~1api~1auth~1logout"
  /api/auth/me:
    $ref: "./paths/auth.yaml#/paths/~1api~1auth~1me"
components:
  schemas:
    UUID:
      type: string
      format: uuid

    RangeFloat:
      type: object
      properties:
        min:
          type: number
          format: double
          minimum: 0.0
          default: 0.0
        max:
          type: number
          format: double
          minimum: 0.0
          default: 0.0

    RangeInt:
      type: object
      properties:
        min:
          type: integer
          minimum: 0
          default: 0
        max:
          type: integer
          minimum: 0
          default: 0

    Sort:
      type: object
      properties:
        key:
          type: string
          enum: ["distance", "time", "likes", "update_at"]
          default: "likes"
        order:
          type: string
          enum: ["asc", "desc"]
          default: "asc"

    TagArray:
      type: array
      items:
        type: string
        minLength: 1
        maxLength: 10
      minItems: 0
      maxItems: 20

    SearchOption:
      type: array
      items:
        type: string
        enum: ["AND", "OR", "NOT"]
      default: ["OR"]

    Limit:
      type: integer
      minimum: 1
      maximum: 60
      default: 12

    RouteSummary:
      type: object
      properties:
        id:
          $ref: "#/components/schemas/UUID"
        title:
          type: string
        description:
          type: string
        distance:
          type: number
          format: double
        time:
          type: integer
        tags:
          $ref: "#/components/schemas/TagArray"
        likes:
          type: integer
        image:
          type: string
          format: uri
        update_at:
          type: string
          pattern: "^\\d{4}/\\d{2}/\\d{2}$"

    Checkpoint:
      type: object
      properties:
        name:
          type: string
        lat:
          type: number
          format: double
        lng:
          type: number
          format: double

    BadgedRoute:
      type: object
      properties:
        id:
          type: string
        title:
          type: string

    LikedRoute:
      type: object
      properties:
        id:
          $ref: "#/components/schemas/UUID"
        title:
          type: string

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

```yaml
#paths/auth.yaml
paths:
  /api/auth/register:
    post:
      summary: ユーザ登録（サインアップ） (Register)
      operationId: Register
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                user_name:
                  type: string
                  minLength: 1
                  maxLength: 32
                password:
                  type: string
                  minLength: 1
                  maxLength: 32
      responses:
        "201":
          description: 成功
          headers:
            Content-Type:
              schema:
                type: string
                example: application/json
            Set-Cookie:
              schema:
                type: string
          content:
            application/json:
              schema:
                type: object
                properties:
                  user_name:
                    type: string
                  error:
                    type: string
                    example: ""
        "400":
          description: 不正なリクエスト
        "409":
          description: 一意の値が衝突
        "500":
          description: サーバー内エラー

  /api/auth/login:
    post:
      summary: ログイン (Login)
      operationId: Login
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                user_name:
                  type: string
                  minLength: 1
                  maxLength: 32
                password:
                  type: string
                  minLength: 1
                  maxLength: 32
      responses:
        "200":
          description: 成功
          headers:
            Content-Type:
              schema:
                type: string
                example: application/json
            Set-Cookie:
              schema:
                type: string
          content:
            application/json:
              schema:
                type: object
                properties:
                  user_name:
                    type: string
                  error:
                    type: string
                    example: ""
        "400":
          description: 不正なリクエスト
        "401":
          description: 未認証
        "500":
          description: サーバー内エラー

  /api/auth/logout:
    delete:
      summary: ログアウト（トークンの revoke） (Logout)
      operationId: Logout
      security:
        - bearerAuth: []
      responses:
        "200":
          description: 成功
          headers:
            Content-Type:
              schema:
                type: string
                example: application/json
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
                  error:
                    type: string
                    example: ""
        "400":
          description: 不正なリクエスト
        "401":
          description: 未認証
        "500":
          description: サーバー内エラー

  /api/auth/me:
    get:
      summary: ユーザー自身の認証情報取得 (Whoami)
      operationId: Whoami
      security:
        - bearerAuth: []
      responses:
        "200":
          description: 成功
          headers:
            Content-Type:
              schema:
                type: string
                example: application/json
          content:
            application/json:
              schema:
                type: object
                properties:
                  user_id:
                    $ref: "../openapi.yaml#/components/schemas/UUID"
                  user_name:
                    type: string
                  token:
                    type: string
                  error:
                    type: string
                    example: ""
        "400":
          description: 不正なリクエスト
        "401":
          description: 未認証
        "500":
          description: サーバー内エラー
```

```yaml
#paths/checkpoints.yaml
paths:
  /api/routes/{route_id}/checkpoints:
    get:
      summary: どのチェックポイントに訪れているか (GetVisitedCheckpoints)
      operationId: GetVisitedCheckpoints
      security:
        - bearerAuth: []
      parameters:
        - name: route_id
          in: path
          required: true
          schema:
            $ref: "../openapi.yaml#/components/schemas/UUID"
      responses:
        "200":
          description: 成功
          headers:
            Content-Type:
              schema:
                type: string
                example: application/json
          content:
            application/json:
              schema:
                type: object
                properties:
                  route_id:
                    $ref: "../openapi.yaml#/components/schemas/UUID"
                  visited_checkpoints:
                    type: array
                    items:
                      type: boolean
                  error:
                    type: string
                    example: ""
        "400":
          description: 不正なリクエスト
        "401":
          description: 未認証
        "404":
          description: リソースが存在しない
        "500":
          description: サーバー内エラー

  /api/routes/{route_id}/checkpoints/{checkpoint_index}/visit:
    post:
      summary: チェックポイントに訪れる (VisitCheckpoints)
      operationId: VisitCheckpoints
      security:
        - bearerAuth: []
      parameters:
        - name: route_id
          in: path
          required: true
          schema:
            $ref: "../openapi.yaml#/components/schemas/UUID"
        - name: checkpoint_index
          in: path
          required: true
          schema:
            type: integer
            minimum: 0
      responses:
        "200":
          description: 成功
          headers:
            Content-Type:
              schema:
                type: string
                example: application/json
          content:
            application/json:
              schema:
                type: object
                properties:
                  route_id:
                    $ref: "../openapi.yaml#/components/schemas/UUID"
                  checkpoint_index:
                    type: integer
                  visited_count:
                    type: integer
                  total_checkpoints:
                    type: integer
                  error:
                    type: string
                    example: ""
        "400":
          description: 不正なリクエスト
        "401":
          description: 未認証
        "404":
          description: リソースが存在しない
        "500":
          description: サーバー内エラー
```

```yaml
#paths/likes.yaml
get:
  summary: ルートがいいね済みか判定 (IsLiked)
  operationId: IsLiked
  security:
    - bearerAuth: []
  parameters:
    - name: route_id
      in: path
      required: true
      schema:
        $ref: "../openapi.yaml#/components/schemas/UUID"
  responses:
    "200":
      description: 成功
      headers:
        Content-Type:
          schema:
            type: string
            example: application/json
      content:
        application/json:
          schema:
            type: object
            properties:
              route_id:
                $ref: "../openapi.yaml#/components/schemas/UUID"
              is_liked:
                type: boolean
              likes:
                type: integer
              error:
                type: string
                example: ""
    "400":
      description: 不正なリクエスト
    "401":
      description: 未認証
    "404":
      description: リソースが存在しない
    "500":
      description: サーバー内エラー
post:
  summary: いいね追加 (Like)
  operationId: Like
  security:
    - bearerAuth: []
  parameters:
    - name: route_id
      in: path
      required: true
      schema:
        $ref: "../openapi.yaml#/components/schemas/UUID"
  responses:
    "200":
      description: 成功
      headers:
        Content-Type:
          schema:
            type: string
            example: application/json
      content:
        application/json:
          schema:
            type: object
            properties:
              route_id:
                $ref: "../openapi.yaml#/components/schemas/UUID"
              likes:
                type: integer
              error:
                type: string
                example: ""
    "400":
      description: 不正なリクエスト
    "401":
      description: 未認証
    "404":
      description: リソースが存在しない
    "500":
      description: サーバー内エラー
delete:
  summary: いいね削除 (Dislike)
  operationId: Dislike
  security:
    - bearerAuth: []
  parameters:
    - name: route_id
      in: path
      required: true
      schema:
        $ref: "../openapi.yaml#/components/schemas/UUID"
  responses:
    "200":
      description: 成功
      headers:
        Content-Type:
          schema:
            type: string
            example: application/json
      content:
        application/json:
          schema:
            type: object
            properties:
              route_id:
                $ref: "../openapi.yaml#/components/schemas/UUID"
              likes:
                type: integer
              error:
                type: string
                example: ""
    "400":
      description: 不正なリクエスト
    "401":
      description: 未認証
    "404":
      description: リクエストが存在しない
    "500":
      description: サーバー内エラー
```

```yaml
#paths/routes.yaml
paths:
  /api/search:
    post:
      summary: ルート一覧検索（取得） (SearchRoutes)
      operationId: SearchRoutes
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                distance:
                  $ref: "../openapi.yaml#/components/schemas/RangeFloat"
                time:
                  $ref: "../openapi.yaml#/components/schemas/RangeInt"
                tags:
                  $ref: "../openapi.yaml#/components/schemas/TagArray"
                search_option:
                  $ref: "../openapi.yaml#/components/schemas/SearchOption"
                sort:
                  $ref: "../openapi.yaml#/components/schemas/Sort"
                limit:
                  $ref: "../openapi.yaml#/components/schemas/Limit"
      responses:
        "200":
          description: 成功
          headers:
            Content-Type:
              schema:
                type: string
                example: application/json
          content:
            application/json:
              schema:
                type: object
                properties:
                  hit_count:
                    type: integer
                  routes:
                    type: array
                    items:
                      $ref: "../openapi.yaml#/components/schemas/RouteSummary"
                  # 受け取った検索条件も返す
                  distance:
                    $ref: "../openapi.yaml#/components/schemas/RangeFloat"
                  time:
                    $ref: "../openapi.yaml#/components/schemas/RangeInt"
                  tags:
                    $ref: "../openapi.yaml#/components/schemas/TagArray"
                  search_option:
                    $ref: "../openapi.yaml#/components/schemas/SearchOption"
                  sort:
                    $ref: "../openapi.yaml#/components/schemas/Sort"
                  limit:
                    $ref: "../openapi.yaml#/components/schemas/Limit"
                  error:
                    type: string
                    example: ""
        "400":
          description: 不正なリクエスト
        "500":
          description: サーバー内エラー

  /api/routes:
    post:
      summary: ルート詳細情報の作成 (PostRoute)
      operationId: PostRoute
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                title:
                  type: string
                  minLength: 1
                  maxLength: 20
                description:
                  type: string
                  minLength: 1
                  maxLength: 60
                full_description:
                  type: string
                  minLength: 1
                  maxLength: 200
                distance:
                  type: number
                  format: double
                  minimum: 0.0
                time:
                  type: integer
                  minimum: 0
                tags:
                  $ref: "../openapi.yaml#/components/schemas/TagArray"
                total_checkpoints:
                  type: integer
                  minimum: 1
                  maximum: 20
                images:
                  type: array
                  items:
                    type: string
                    format: uri
                    minLength: 8
                    maxLength: 1023
                  minItems: 1
                  maxItems: 6
                map:
                  type: string
                  format: uri
                  minLength: 8
                  maxLength: 1023
                checkpoints:
                  type: array
                  items:
                    $ref: "../openapi.yaml#/components/schemas/Checkpoint"
      responses:
        "201":
          description: 作成成功
          headers:
            Content-Type:
              schema:
                type: string
                example: application/json
          content:
            application/json:
              schema:
                type: object
                properties:
                  route_id:
                    $ref: "../openapi.yaml#/components/schemas/UUID"
                  update_at:
                    type: string
                    pattern: "^\\d{4}/\\d{2}/\\d{2}$"
                  # 受け取った値のエコー
                  title:
                    type: string
                    minLength: 1
                    maxLength: 20
                  description:
                    type: string
                    minLength: 1
                    maxLength: 60
                  full_description:
                    type: string
                    minLength: 1
                    maxLength: 200
                  distance:
                    type: number
                    format: double
                    minimum: 0.0
                  time:
                    type: integer
                    minimum: 0
                  tags:
                    $ref: "../openapi.yaml#/components/schemas/TagArray"
                  total_checkpoints:
                    type: integer
                    minimum: 1
                    maximum: 20
                  images:
                    type: array
                    items:
                      type: string
                      format: uri
                  map:
                    type: string
                    format: uri
                  checkpoints:
                    type: array
                    items:
                      $ref: "../openapi.yaml#/components/schemas/Checkpoint"
                  error:
                    type: string
                    example: ""
        "400":
          description: 不正なリクエスト
        "401":
          description: 未認証
        "500":
          description: サーバー内エラー

  /api/routes/{route_id}:
    get:
      summary: ルート詳細情報の取得 (GetRoute)
      operationId: GetRoute
      parameters:
        - name: route_id
          in: path
          required: true
          schema:
            $ref: "../openapi.yaml#/components/schemas/UUID"
      responses:
        "200":
          description: 成功
          headers:
            Content-Type:
              schema:
                type: string
                example: application/json
          content:
            application/json:
              schema:
                type: object
                properties:
                  route_id:
                    $ref: "../openapi.yaml#/components/schemas/UUID"
                  title:
                    type: string
                  description:
                    type: string
                  full_description:
                    type: string
                  distance:
                    type: number
                    format: double
                  time:
                    type: integer
                  tags:
                    $ref: "../openapi.yaml#/components/schemas/TagArray"
                  total_checkpoints:
                    type: integer
                  images:
                    type: array
                    items:
                      type: string
                      format: uri
                  map:
                    type: string
                    format: uri
                  update_at:
                    type: string
                    pattern: "^\\d{4}/\\d{2}/\\d{2}$"
                  checkpoints:
                    type: array
                    items:
                      $ref: "../openapi.yaml#/components/schemas/Checkpoint"
                  error:
                    type: string
                    example: ""
        "400":
          description: 不正なリクエスト
        "404":
          description: リソースが存在しない
        "500":
          description: サーバー内エラー
```

```yaml
#paths/tags.yaml
get:
  summary: 検索可能なタグの取得 (GetTags)
  operationId: GetTags
  responses:
    "200":
      description: 成功
      headers:
        Content-Type:
          schema:
            type: string
            example: application/json
      content:
        application/json:
          schema:
            type: object
            properties:
              tags:
                type: array
                items:
                  type: string
              error:
                type: string
                example: ""
    "500":
      description: サーバー内エラー
      content:
        application/json:
          schema:
            type: object
            properties:
              error:
                type: string
```

```yaml
#paths/user.yaml
get:
  summary: ユーザープロフィール取得 (GetProfile)
  operationId: GetProfile
  security:
    - bearerAuth: []
  responses:
    "200":
      description: 成功
      headers:
        Content-Type:
          schema:
            type: string
            example: application/json
        Authorization:
          schema:
            type: string
      content:
        application/json:
          schema:
            type: object
            properties:
              user_name:
                type: string
              badged_routes:
                type: array
                items:
                  $ref: "../openapi.yaml#/components/schemas/BadgedRoute"
              liked_routes:
                type: array
                items:
                  $ref: "../openapi.yaml#/components/schemas/LikedRoute"
              mileage:
                type: number
                format: double
              total_distance:
                type: number
                format: double
              error:
                type: string
                example: ""
    "400":
      description: 不正なリクエスト
    "401":
      description: 未認証
    "404":
      description: ユーザーが存在しない
    "500":
      description: サーバー内エラー
```
