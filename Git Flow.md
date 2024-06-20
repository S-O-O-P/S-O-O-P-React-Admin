Git + Git Flow
---

## 1. Git Flow Branch 구조

![1](https://github.com/WillingToGoHome/GymGa/assets/157683242/7c067801-8d6e-48f4-b8b8-dad3144f3a90)


### ✅ **master** : 라이브 서버에 제품으로 출시되는 브랜치

### ✅ develop : 다음 출시 버전을 대비하여 개발하는 브랜치

### ✅ feature : 추가 기능 개발 브랜치. develop 브랜치에 들어간다.

### ✅ release : 다음 버전 출시를 준비하는 브랜치. develop 브랜치를
                    release  브랜치로 옮긴 후 QA, 테스트를 진행하고
                    master 브랜치로 합친다.

### ✅ hotfix : master 브랜치에서 발생한 버그를 수정하는 브랜치

---

## 2. Team BlizzaB 협업 방식

### ① 메인 브랜치

![2](https://github.com/WillingToGoHome/GymGa/assets/157683242/048bac82-7339-4d99-9874-369163fdbf3b)

<aside>
✅ master 브랜치는 배포 가능한 상태만을 관리하는 브랜치를 말하며,
delvelop 브랜치는 다음에 배포할 것을 개발하는 브랜치이다.
즉, develop 브랜치는 통합 브랜치의 역할을 하며,
평소에는 이 브랜치를 기반으로 개발을 진행한다.

</aside>

### ② 보조 브랜치

![3](https://github.com/WillingToGoHome/GymGa/assets/157683242/23bafe67-8f87-46fb-bf17-55d365099640)


<aside>
✅ 가지가 뻗어나오는 곳 : develop

</aside>
<br>
<aside>
✅ 뻗어나갔던 가지가 다시 합쳐지는 곳 : develop

</aside>
<br>
<aside>
✅ 새로운 기능을 추가할 때 사용한다.

</aside>

### release와 hotfix 브랜치는 보류(프로젝트 진행 시 추가 할 수도)

---

## 3. GitHub 이슈 작성

### ① 이슈가 발생하면 프로젝트 관련 Repositories에 있는 Issues로 들어가서
     [New Issue]를 누른다.

 

![4](https://github.com/WillingToGoHome/GymGa/assets/157683242/48d272cd-695b-4d40-8881-de83d1cd85e3)

<aside>
✅ 사용하는 이슈 템플릿은 3가지가 있으며, 관련 이슈를 선택한다.

</aside>

![5](https://github.com/WillingToGoHome/GymGa/assets/157683242/10166f7a-0081-4731-866a-0da72ede36cd)

- Add a title 작성 : [Branch][Domain][내용]#IssueNumber
                            *ex)[Feature][Header][Navbar 로그인 기능 구현]#68*
- Assignees : 본인 계정 등록
- Labels : 해당 라벨 등록
- Projects : 프로젝트는 추후에 프로젝트 관련 Repository 생성 후 등록

---

## 4. Pull Request

![6](https://github.com/WillingToGoHome/GymGa/assets/157683242/1f3cf7e9-2b48-42fc-9172-462c204f09a2)

<aside>
✅ 작성법은 Issue 작성과 비슷하다.
위의 내용대로 진행하되 **작업동기** 는 작성하지 않아도 된다.

</aside>

---

## 5. 브랜치 보호 규칙

### default

- default 브랜치는 devleop으로 설정한다.

### main

- Require a pull request before merging: PR을 통해서만 코드 병합
- Require status checks to pass before merging: 테스트 코드를 통과한 코드만 병합

### develop

- Require a pull request before merging Require approvals(2): 2 명 이상의 승인이 있어야
                                                                                                병합 가능
- check your Files changed and right check commit status above(develop from [Branch][Page][내용]) before merging require approval : 수정한 파일들을 확인하고 커밋상태 확인

### ☣위 규칙은 프로젝트를 진행함에 있어서 일부 수정될 수 있다.
